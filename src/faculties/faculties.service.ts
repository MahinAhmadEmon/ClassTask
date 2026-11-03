
import { Injectable, NotFoundException,} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFacultyDto } from './dto/create-faculty.dto.js';
import { UpdateFacultyDto } from './dto/update-faculty.dto.js';
import { Faculty } from './entities/faculty.entity.js';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultyRepository: Repository<Faculty>,
  ) {}


  async create(
    createFacultyDto: CreateFacultyDto,
  ): Promise<Faculty> {
    const faculty =
      this.facultyRepository.create(createFacultyDto);

    return this.facultyRepository.save(faculty);
  }

  async findAll(): Promise<Faculty[]> {
    return this.facultyRepository.find();
  }

  async findOne(id: string): Promise<Faculty> {
    const faculty = await this.facultyRepository.findOne({
      where: { Id: id },
    });

    if (!faculty) {
      throw new NotFoundException(
        `Faculty with ID ${id} not found`,
      );
    }

    return faculty;
  }

  async update(
    id: string,
    updateFacultyDto: UpdateFacultyDto,
  ): Promise<Faculty> {
    const faculty = await this.findOne(id);

    Object.assign(faculty, updateFacultyDto);

    return this.facultyRepository.save(faculty);
  }

  async remove(id: string): Promise<void> {
    const result = await this.facultyRepository.delete({
      Id: id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Faculty with ID ${id} not found`,
      );
    }
  }
}

