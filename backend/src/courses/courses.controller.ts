import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Courses')
@ApiBearerAuth('JWT-auth')
@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @ApiOperation({ summary: 'Get all courses' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.coursesService.findAll(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
      search,
    );
  }

  @Get(':id')
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @ApiOperation({ summary: 'Get course by ID' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create course' })
  create(@Body() createCourseDto: any) {
    return this.coursesService.create(createCourseDto);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update course' })
  update(@Param('id') id: string, @Body() updateCourseDto: any) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete course' })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

  // Course Syllabus Endpoints
  @Get(':courseId/syllabus')
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @ApiOperation({ summary: 'Get syllabus for a course' })
  getSyllabusForCourse(@Param('courseId') courseId: string) {
    return this.coursesService.getSyllabusForCourse(courseId);
  }

  @Post(':courseId/syllabus')
  @Roles('TEACHER')
  @ApiOperation({ summary: 'Upload course syllabus' })
  async createSyllabus(
    @Param('courseId') courseId: string,
    @Body() body: any,
    @Req() req: any,
  ) {
    const teacherId = req.user.teacher?.id;
    if (!teacherId) {
      throw new BadRequestException('Only teachers can upload syllabus');
    }

    const { title, description, fileUrl, fileName, fileSize, mimeType } = body;

    if (!fileUrl || !fileName) {
      throw new BadRequestException('File information is required');
    }

    return this.coursesService.createSyllabus(
      courseId,
      teacherId,
      title,
      description,
      fileUrl,
      fileName,
      fileSize,
      mimeType,
    );
  }

  @Get('syllabus/:syllabusId')
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @ApiOperation({ summary: 'Get syllabus by ID' })
  getSyllabusById(@Param('syllabusId') syllabusId: string) {
    return this.coursesService.getSyllabusById(syllabusId);
  }

  @Patch('syllabus/:syllabusId')
  @Roles('TEACHER')
  @ApiOperation({ summary: 'Update syllabus' })
  async updateSyllabus(
    @Param('syllabusId') syllabusId: string,
    @Body() updateData: any,
    @Req() req: any,
  ) {
    const syllabus = await this.coursesService.getSyllabusById(syllabusId);
    if (!syllabus) {
      throw new BadRequestException('Syllabus not found');
    }

    if (syllabus.teacherId !== req.user.teacher?.id) {
      throw new BadRequestException('You can only update your own syllabus');
    }

    return this.coursesService.updateSyllabus(syllabusId, updateData);
  }

  @Delete('syllabus/:syllabusId')
  @Roles('TEACHER')
  @ApiOperation({ summary: 'Delete syllabus' })
  async deleteSyllabus(
    @Param('syllabusId') syllabusId: string,
    @Req() req: any,
  ) {
    const syllabus = await this.coursesService.getSyllabusById(syllabusId);
    if (!syllabus) {
      throw new BadRequestException('Syllabus not found');
    }

    if (syllabus.teacherId !== req.user.teacher?.id) {
      throw new BadRequestException('You can only delete your own syllabus');
    }

    return this.coursesService.deleteSyllabus(syllabusId);
  }
}
