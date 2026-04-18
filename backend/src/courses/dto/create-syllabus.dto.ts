import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSyllabusDto {
  @ApiProperty({ example: 'Course Syllabus' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'Syllabus for the course' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  @IsNotEmpty()
  courseId: string;
}

export class UpdateSyllabusDto {
  @ApiProperty({ example: 'Course Syllabus Updated' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @ApiProperty({ example: 'Updated syllabus description' })
  @IsString()
  @IsOptional()
  description?: string;
}
