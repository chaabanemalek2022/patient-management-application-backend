import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientsRepository: Repository<Patient>,
  ) {}

  async isEmailUnique(email: string): Promise<boolean> {
    const existingPatient = await this.patientsRepository.findOne({
      where: { email },
    });
    return !existingPatient;
  }

  async create(createPatientDto: CreatePatientDto) {
    const { email } = createPatientDto;

    const isEmailUnique = await this.isEmailUnique(email);

    if (!isEmailUnique) {
      // Throw a conflict exception with a custom error message
      throw new ConflictException('Email already exists');
    }

    const patient = this.patientsRepository.create(createPatientDto);
    return await this.patientsRepository.save(patient);
  }

  async findAll() {
    return await this.patientsRepository.find();
  }

  async findOne(id: number) {
    const patient = await this.patientsRepository.findOneBy({ id });
    if (!patient) throw new NotFoundException();
    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findOne(id);
    Object.assign(patient, updatePatientDto);
    return await this.patientsRepository.save(patient);
  }

  async remove(id: number) {
    const patient = await this.findOne(id);
    return await this.patientsRepository.remove(patient);
  }
}
