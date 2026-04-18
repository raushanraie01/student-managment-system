import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10, filters?: any) {
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.subjectId) where.subjectId = filters.subjectId;
    if (filters?.teacherId) where.teacherId = filters.teacherId;

    const [assignments, total] = await Promise.all([
      this.prisma.assignment.findMany({
        where,
        skip,
        take: limit,
        include: {
          subject: true,
          teacher: {
            include: {
              user: { select: { email: true } },
            },
          },
          submissions: {
            include: {
              student: {
                include: {
                  user: { select: { email: true } },
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.assignment.count({ where }),
    ]);

    return {
      data: assignments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.assignment.findUnique({
      where: { id },
      include: {
        subject: true,
        teacher: {
          include: {
            user: true,
          },
        },
        submissions: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
  }

  async create(data: any) {
    return this.prisma.assignment.create({
      data: {
        ...data,
        dueDate: new Date(data.dueDate),
      },
      include: {
        subject: true,
        teacher: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.assignment.update({
      where: { id },
      data: data.dueDate ? { ...data, dueDate: new Date(data.dueDate) } : data,
      include: {
        subject: true,
        teacher: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.assignment.delete({
      where: { id },
    });
  }

  async submitAssignment(assignmentId: string, studentId: string, data: any) {
    return this.prisma.assignmentSubmission.create({
      data: {
        assignmentId,
        studentId,
        ...data,
        submittedAt: new Date(),
      },
      include: {
        assignment: true,
        student: true,
      },
    });
  }

  async gradeSubmission(id: string, remarks?: string) {
    return this.prisma.assignmentSubmission.update({
      where: { id },
      data: {
        remarks,
        gradedAt: new Date(),
        status: 'GRADED',
      },
      include: {
        assignment: true,
        student: true,
      },
    });
  }
}
