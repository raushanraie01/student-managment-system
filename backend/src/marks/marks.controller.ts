import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MarksService } from './marks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Marks')
@ApiBearerAuth('JWT-auth')
@Controller('marks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Get()
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Get all marks' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('studentId') studentId?: string,
    @Query('subjectId') subjectId?: string,
    @Query('teacherId') teacherId?: string,
  ) {
    return this.marksService.findAll(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
      { studentId, subjectId, teacherId },
    );
  }

  @Get('student/:studentId')
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @ApiOperation({ summary: 'Get marks by student ID' })
  findByStudent(@Param('studentId') studentId: string) {
    return this.marksService.findByStudent(studentId);
  }

  @Post()
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Create mark' })
  create(@Body() createMarkDto: any) {
    return this.marksService.create(createMarkDto);
  }

  @Patch(':id')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Update mark' })
  update(@Param('id') id: string, @Body() updateMarkDto: any) {
    return this.marksService.update(id, updateMarkDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Delete mark' })
  remove(@Param('id') id: string) {
    return this.marksService.remove(id);
  }
}
