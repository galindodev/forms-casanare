import { IsString, IsEmail, IsEnum, IsBoolean, IsNumberString, IsOptional, MinLength, Matches } from 'class-validator';

export class CreateRegistroDTO {
  @IsString()
  @MinLength(3)
  fullName!: string;

  @IsString()
  @Matches(/^\+\d{1,3}$/, { message: 'Country code must be +XX format' })
  countryCode!: string;

  @IsNumberString()
  @Matches(/^\d{7,15}$/, { message: 'Phone must be 7-15 digits' })
  phone!: string;

  @IsString()
  identificationType!: string;

  @IsString()
  @MinLength(5)
  identificationNumber!: string;

  @IsEmail()
  email!: string;

  @IsString()
  address!: string;

  @IsString()
  @MinLength(2)
  neighborhood!: string;

  @IsString()
  ageGroup!: string;

  @IsString()
  department!: string;

  @IsString()
  municipality!: string;

  @IsEnum(['Male', 'Female'])
  gender!: 'Male' | 'Female';

  @IsBoolean()
  acceptedTerms!: boolean;

  @IsOptional()
  @IsString()
  referredById?: string;
}
