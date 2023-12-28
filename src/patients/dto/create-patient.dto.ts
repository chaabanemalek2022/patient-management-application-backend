import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  Length,
  IsString,
  IsIn,
  IsDateString,
  ValidatorConstraint,
  ValidationOptions,
  registerDecorator,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@ValidatorConstraint({ name: 'isDateAfter1920', async: false })
export class IsDateAfter1920Constraint implements ValidatorConstraintInterface {
  validate(dateOfBirth: string) {
    const year1920 = new Date('1920-01-01');
    return new Date(dateOfBirth) >= year1920;
  }
}

export function IsDateAfter1920(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateAfter1920Constraint,
    });
  };
}

export class CreatePatientDto {
  @ApiProperty({
    description: 'First name of the patient',
    required: true,
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  firstName: string;

  @ApiProperty({
    description: 'Last name of the patient',
    required: true,
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  lastName: string;

  @ApiProperty({
    description:
      'Date of birth of the patient (format: YYYY-MM-DD). Should be after the year 1920.',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  @IsDateAfter1920({ message: 'Date of birth must be after the year 1920' })
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Gender of the patient (Male or Female)',
    required: true,
  })
  @IsNotEmpty()
  @IsIn(['Male', 'Female'], { message: 'Gender must be Male or Female' })
  gender: string;

  @ApiProperty({
    description: 'Address of the patient',
    minLength: 1,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  address?: string;

  @ApiProperty({
    description: 'Phone number of the patient',
    minLength: 1,
    maxLength: 20,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  phoneNumber?: string;

  @ApiProperty({
    description: 'Email of the patient',
    required: true,
    format: 'email',
    minLength: 6,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(6, 100)
  email: string;
}
