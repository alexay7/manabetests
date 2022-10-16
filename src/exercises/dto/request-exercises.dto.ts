import { Types } from 'mongoose';
import {
	IsString,
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsOptional,
} from "class-validator";

export class ExerciseRequestDto {
  @IsString()
  @IsNotEmpty()
  	type: string;

  @IsString()
  @IsNotEmpty()
  	level: string;

  @IsNumber()
  @IsOptional()
  	year: number;

  @IsString()
  @IsOptional()
  	period: string;

  @IsString()
  @IsOptional()
  	category: string;

  @IsArray()
  @IsOptional()
  	sections: string[];

  @IsNumber()
  @IsOptional()
  	questionNum: number;

  @IsNumber()
  @IsOptional()
    skip:number;

  @IsArray()
  @IsOptional()
    wrongs:Types.ObjectId[];
}
