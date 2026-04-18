import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarksService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10, filters?: any) {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.studentId) where.studentId = filters.studentId;
    if (filters?.subjectId) where.subjectId = filters.subjectId;
    if (filters?.teacherId) where.teacherId = filters.teacherId;

    const [marks, total] = await Promise.all([
      this.prisma.mark.findMany({
        where,
        skip,
        take: limit,
        include: {
          student: {
            include: {
              user: { select: { email: true } },
            },
          },
          subject: true,
          teacher: {
            include: {
              user: { select: { email: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.mark.count({ where }),
    ]);

    return {
      data: marks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByStudent(studentId: string) {
    return this.prisma.mark.findMany({
      where: { studentId },
      include: {
        subject: true,
        teacher: {
          include: {
            user: { select: { email: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: any) {
    return this.prisma.mark.create({
      data,
      include: {
        student: true,
        subject: true,
        teacher: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.mark.update({
      where: { id },
      data,
      include: {
        student: true,
        subject: true,
        teacher: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.mark.delete({
      where: { id },
    });
  }
}
