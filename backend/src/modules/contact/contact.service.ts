import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

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

    return {
      message: 'Contato enviado com sucesso!',
      id: contact.id,
    };
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
