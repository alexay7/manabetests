import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExtraexercisesService } from './extraexercises.service';
import { UpdateExtraexerciseDto } from './dto/update-extraexercise.dto';

@Controller('extraexercises')
export class ExtraexercisesController {
  constructor(private readonly extraexercisesService: ExtraexercisesService) {}

  @Get()
  findAll() {
    return this.extraexercisesService.findAll();
  }
}
