import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalContacts,
      contactsLastMonth,
      contactsLastWeek,
      totalPageViews,
      pageViewsLastMonth,
      resumeDownloads,
      topPages,
    ] = await Promise.all([
      this.prisma.contact.count(),
      this.prisma.contact.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      this.prisma.contact.count({
        where: { createdAt: { gte: sevenDaysAgo } },
      }),
      this.prisma.pageView.count(),
      this.prisma.pageView.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      this.prisma.resumeDownload.count(),
      this.prisma.pageView.groupBy({
        by: ['page'],
        _count: { page: true },
        where: { createdAt: { gte: thirtyDaysAgo } },
        orderBy: { _count: { page: 'desc' } },
        take: 5,
      }),
    ]);

    return {
      contacts: {
        total: totalContacts,
        lastMonth: contactsLastMonth,
        lastWeek: contactsLastWeek,
      },
      pageViews: {
        total: totalPageViews,
        lastMonth: pageViewsLastMonth,
      },
      resumeDownloads: {
        total: resumeDownloads,
      },
      topPages: topPages.map((page) => ({
        page: page.page,
        views: page._count.page,
      })),
    };
  }

  async getContacts(page: number = 1, limit: number = 10, status?: string) {
    const skip = (page - 1) * limit;
    const where = status ? { status } : {};

    const [contacts, total] = await Promise.all([
      this.prisma.contact.findMany({
        where,
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
      this.prisma.contact.count({ where }),
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

  async updateContactStatus(contactId: string, status: string) {
    return this.prisma.contact.update({
      where: { id: contactId },
      data: { status },
    });
  }

  async getAnalytics() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Page views over time (daily for last 30 days)
    const pageViewsByDay = await this.prisma.pageView.groupBy({
      by: ['createdAt'],
      _count: true,
      where: {
        createdAt: { gte: thirtyDaysAgo },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Resume downloads by language
    const resumeDownloadsByLanguage = await this.prisma.resumeDownload.groupBy({
      by: ['language'],
      _count: true,
      orderBy: { _count: { language: 'desc' } },
    });

    // Contacts over time
    const contactsByDay = await this.prisma.contact.groupBy({
      by: ['createdAt'],
      _count: true,
      where: {
        createdAt: { gte: thirtyDaysAgo },
      },
      orderBy: { createdAt: 'asc' },
    });

    return {
      pageViewsByDay,
      resumeDownloadsByLanguage,
      contactsByDay,
    };
  }
}
