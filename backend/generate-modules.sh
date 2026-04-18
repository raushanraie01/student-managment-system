#!/bin/bash

# Student Management Portal - Backend Module Generator
# This script creates all remaining backend modules with boilerplate code

echo "🚀 Generating remaining backend modules..."

# Create Students Module
mkdir -p src/students/dto
cat > src/students/students.module.ts << 'EOF'
import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
EOF

cat > src/students/students.service.ts << 'EOF'
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: any, userId?: string) {
    // Create user if not provided
    if (!userId) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(createDto.password || 'Student@123', 10);
      const user = await this.prisma.user.create({
        data: {
          email: createDto.email,
          password: hashedPassword,
          role: Role.STUDENT,
        },
      });
      userId = user.id;
    }

    const student = await this.prisma.student.create({
      data: {
        userId,
        enrollmentNo: createDto.enrollmentNo,
        firstName: createDto.firstName,
        lastName: createDto.lastName,
        dateOfBirth: new Date(createDto.dateOfBirth),
        gender: createDto.gender,
        phone: createDto.phone,
        address: createDto.address,
        city: createDto.city,
        state: createDto.state,
        pincode: createDto.pincode,
        parentName: createDto.parentName,
        parentPhone: createDto.parentPhone,
        parentEmail: createDto.parentEmail,
        bloodGroup: createDto.bloodGroup,
        classId: createDto.classId,
      },
      include: { user: true, class: true },
    });

    return student;
  }

  async findAll(page = 1, limit = 10, search?: string, classId?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.OR = [
        { enrollmentNo: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (classId) {
      where.classId = classId;
    }

    const [students, total] = await Promise.all([
      this.prisma.student.findMany({
        where,
        skip,
        take: limit,
        include: { user: { select: { email: true, isActive: true } }, class: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.student.count({ where }),
    ]);

    return { data: students, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
      include: {
        user: true,
        class: { include: { course: true } },
        marks: { include: { subject: true } },
        attendance: { include: { class: true }, orderBy: { date: 'desc' }, take: 10 },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async update(id: string, updateDto: any) {
    await this.findOne(id);
    return this.prisma.student.update({
      where: { id },
      data: updateDto,
      include: { user: true, class: true },
    });
  }

  async remove(id: string) {
    const student = await this.findOne(id);
    await this.prisma.user.delete({ where: { id: student.userId } });
    return { message: 'Student deleted successfully' };
  }
}
EOF

cat > src/students/students.controller.ts << 'EOF'
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Students')
@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create student (Admin only)' })
  create(@Body() createDto: any) {
    return this.studentsService.create(createDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Get all students' })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('classId') classId?: string,
  ) {
    return this.studentsService.findAll(page, limit, search, classId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by ID' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update student (Admin only)' })
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.studentsService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete student (Admin only)' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
EOF

echo "✓ Students module created"

# Create remaining modules with similar structure
for module in teachers courses subjects classes marks attendance assignments announcements materials reports; do
    mkdir -p "src/${module}"
    
    # Module file
    cat > "src/${module}/${module}.module.ts" << EOF
import { Module } from '@nestjs/common';
import { ${module^}Service } from './${module}.service';
import { ${module^}Controller } from './${module}.controller';

@Module({
  controllers: [${module^}Controller],
  providers: [${module^}Service],
  exports: [${module^}Service],
})
export class ${module^}Module {}
EOF

    # Service file
    cat > "src/${module}/${module}.service.ts" << EOF
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ${module^}Service {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.${module}.findMany();
  }

  async findOne(id: string) {
    return this.prisma.${module}.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.${module}.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.${module}.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.${module}.delete({ where: { id } });
  }
}
EOF

    # Controller file
    cat > "src/${module}/${module}.controller.ts" << EOF
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ${module^}Service } from './${module}.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('${module^}')
@Controller('${module}')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ${module^}Controller {
  constructor(private readonly service: ${module^}Service) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() createDto: any) {
    return this.service.create(createDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
EOF

    echo "✓ ${module^} module created"
done

echo "✅ All backend modules generated!"
echo "📝 Note: Please customize DTOs and validation for each module as needed"
