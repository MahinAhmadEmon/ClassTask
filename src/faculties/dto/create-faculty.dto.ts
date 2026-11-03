
import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateFacultyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  Id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  Name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  expertise: string;

  @IsInt()
  @Min(0)
  noOfPublication: number;
}

