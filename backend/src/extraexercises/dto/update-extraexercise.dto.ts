import { PartialType } from '@nestjs/mapped-types';
import { CreateExtraexerciseDto } from './create-extraexercise.dto';

export class UpdateExtraexerciseDto extends PartialType(CreateExtraexerciseDto) {}
