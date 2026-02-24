import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Resend } from 'resend';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly resend: Resend | null;
  private readonly adminEmail = process.env.ADMIN_EMAIL;
  private readonly fromEmail =
    process.env.FROM_EMAIL || 'noreply@mateusribeirocampos.dev';

  constructor(private prisma: PrismaService) {
    const apiKey = process.env.RESEND_API_KEY;
    this.resend = apiKey ? new Resend(apiKey) : null;
    if (!this.resend) {
      this.logger.warn(
        'RESEND_API_KEY não configurado — emails de notificação desativados',
      );
    }
  }

  async createContact(
    createContactDto: CreateContactDto,
    ipAddress: string,
    userAgent: string,
  ) {
    // Rate limiting por IP (5 contatos por hora)
    const recentContacts = await this.prisma.contact.count({
      where: {
        ipAddress,
        createdAt: {
          gte: new Date(Date.now() - 60 * 60 * 1000), // 1 hora
        },
      },
    });

    if (recentContacts >= 5) {
      throw new BadRequestException(
        'Muitos contatos enviados. Tente novamente em 1 hora.',
      );
    }

    // Salvar no banco
    const contact = await this.prisma.contact.create({
      data: {
        ...createContactDto,
        ipAddress,
        userAgent,
      },
    });

    // Enviar email de notificação (sem bloquear a resposta)
    this.sendNotificationEmail(contact).catch((err) =>
      this.logger.error('Falha ao enviar email de notificação', err),
    );

    return {
      message: 'Contato enviado com sucesso!',
      id: contact.id,
    };
  }

  private async sendNotificationEmail(contact: {
    name: string;
    email: string;
    message: string;
    id: string;
  }) {
    if (!this.resend || !this.adminEmail) return;

    await this.resend.emails.send({
      from: this.fromEmail,
      to: this.adminEmail,
      subject: `[Portfolio] Nova mensagem de ${contact.name}`,
      html: `
        <h2>Nova mensagem de contato recebida</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold">Nome:</td><td style="padding:8px">${contact.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email:</td><td style="padding:8px">${contact.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Mensagem:</td><td style="padding:8px;white-space:pre-wrap">${contact.message}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">ID:</td><td style="padding:8px">${contact.id}</td></tr>
        </table>
        <p style="margin-top:16px">
          <a href="https://portfolio-mateusribeirocampos.vercel.app/admin">Ver no painel admin</a>
        </p>
      `,
    });
  }

  async getContacts(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      this.prisma.contact.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          message: true,
          createdAt: true,
          status: true,
        },
      }),
      this.prisma.contact.count(),
    ]);

    return {
      contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateContactStatus(id: string, status: string) {
    return this.prisma.contact.update({
      where: { id },
      data: { status },
    });
  }
}
