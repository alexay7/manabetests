import { Types } from 'mongoose';
import {
	IsString,
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsOptional,
  IsObject,
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

export class RequestCorrectionDto {
  @IsArray()
  sectionAnswers: {
    section:string,
    answers:(
      {
      questionId:Types.ObjectId,
      type:"normal",
      answer:number
    }|
      {
      questionId:Types.ObjectId,
      type:"extra",
      answer:Record<number,number>
    }
  )[]
  }[]
}