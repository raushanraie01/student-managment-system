import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { user: { email: { contains: search, mode: 'insensitive' as any } } },
            { department: { contains: search, mode: 'insensitive' as any } },
            { specialization: { contains: search, mode: 'insensitive' as any } },
          ],
        }
      : {};

    const [teachers, total] = await Promise.all([
      this.prisma.teacher.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              isActive: true,
              createdAt: true,
            },
          },
          subjects: true,
          classes: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.teacher.count({ where }),
    ]);

    return {
      data: teachers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.teacher.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
          },
        },
        subjects: true,
        classes: {
          include: {
            course: true,
            students: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.teacher.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
          },
        },
        subjects: true,
        classes: true,
      },
    });
  }

  async create(data: any) {
    return this.prisma.teacher.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.teacher.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}
