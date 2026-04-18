import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Assignments')
@ApiBearerAuth('JWT-auth')
@Controller('assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @ApiOperation({ summary: 'Get all assignments' })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('subjectId') subjectId?: string,
    @Query('teacherId') teacherId?: string,
  ) {
    return this.assignmentsService.findAll(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10,
      { subjectId, teacherId },
    );
  }

  @Get(':id')
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @ApiOperation({ summary: 'Get assignment by ID' })
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Create assignment' })
  create(@Body() createAssignmentDto: any) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Patch(':id')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Update assignment' })
  update(@Param('id') id: string, @Body() updateAssignmentDto: any) {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Delete assignment' })
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(id);
  }

  @Post(':id/submit')
  @Roles('STUDENT')
  @ApiOperation({ summary: 'Submit assignment' })
  submit(
    @Param('id') id: string,
    @Body() submitDto: { studentId: string; content: string; attachments?: string },
  ) {
    return this.assignmentsService.submitAssignment(id, submitDto.studentId, submitDto);
  }

  @Patch('submissions/:id/grade')
  @Roles('ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Grade assignment submission' })
  gradeSubmission(
    @Param('id') id: string,
    @Body() gradeDto: { remarks?: string },
  ) {
    return this.assignmentsService.gradeSubmission(id, gradeDto.remarks);
  }
}
