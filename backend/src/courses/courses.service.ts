import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as any } },
            { code: { contains: search, mode: 'insensitive' as any } },
            { description: { contains: search, mode: 'insensitive' as any } },
          ],
        }
      : {};

    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where,
        skip,
        take: limit,
        include: {
          subjects: true,
          classes: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.course.count({ where }),
    ]);

    return {
      data: courses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        subjects: true,
        classes: {
          include: {
            teacher: {
              include: {
                user: true,
              },
            },
            students: true,
          },
        },
      },
    });
  }

  async create(data: any) {
    return this.prisma.course.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.course.delete({
      where: { id },
    });
  }

  // Course Syllabus methods
  async createSyllabus(
    courseId: string,
    teacherId: string,
    title: string,
    description: string,
    fileUrl: string,
    fileName: string,
    fileSize: number,
    mimeType: string,
  ) {
    return this.prisma.courseSyllabus.create({
      data: {
        title,
        description,
        fileUrl,
        fileName,
        fileSize,
        mimeType,
        courseId,
        teacherId,
      },
      include: {
        course: true,
        teacher: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async getSyllabusForCourse(courseId: string) {
    return this.prisma.courseSyllabus.findMany({
      where: { courseId },
      include: {
        course: true,
        teacher: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSyllabusById(id: string) {
    return this.prisma.courseSyllabus.findUnique({
      where: { id },
      include: {
        course: true,
        teacher: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async updateSyllabus(id: string, data: any) {
    return this.prisma.courseSyllabus.update({
      where: { id },
      data,
      include: {
        course: true,
        teacher: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async deleteSyllabus(id: string) {
    return this.prisma.courseSyllabus.delete({
      where: { id },
    });
  }
}
