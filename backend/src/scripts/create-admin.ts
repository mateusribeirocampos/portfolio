import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import {
  isAllowedAdminEmail,
  normalizeAdminEmail,
} from '../modules/admin/admin-allow-list';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const rawEmail = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!rawEmail || !password) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be configured');
    }

    const email = normalizeAdminEmail(rawEmail);

    if (!isAllowedAdminEmail(email)) {
      throw new Error('ADMIN_EMAIL must be listed in ALLOW_USER_ADMIN');
    }

    // Check if admin already exists
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      console.log('Admin user already exists with email:', email);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const admin = await prisma.adminUser.create({
      data: {
        email,
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('Admin user created successfully!');
    console.log('Email:', email);
    console.log('ID:', admin.id);

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

void createAdmin();
