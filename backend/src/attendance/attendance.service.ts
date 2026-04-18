import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10, filters?: any) {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.studentId) where.studentId = filters.studentId;
    if (filters?.classId) where.classId = filters.classId;
    if (filters?.date) where.date = new Date(filters.date);
    if (filters?.status) where.status = filters.status;

    const [attendance, total] = await Promise.all([
      this.prisma.attendance.findMany({
        where,
        skip,
        take: limit,
        include: {
          student: {
            include: {
              user: { select: { email: true } },
            },
          },
          class: {
            include: {
              course: true,
            },
          },
        },
        orderBy: { date: 'desc' },
      }),
      this.prisma.attendance.count({ where }),
    ]);

    return {
      data: attendance,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByStudent(studentId: string) {
    return this.prisma.attendance.findMany({
      where: { studentId },
      include: {
        class: {
          include: {
            course: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });
  }

  async create(data: any) {
    return this.prisma.attendance.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
      include: {
        student: true,
        class: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.attendance.update({
      where: { id },
      data: data.date ? { ...data, date: new Date(data.date) } : data,
      include: {
        student: true,
        class: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.attendance.delete({
      where: { id },
    });
  }
}
