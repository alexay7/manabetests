import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestCorrectionDto } from 'src/exercises/dto/request-exercises.dto';
import { ExercisesService } from 'src/exercises/exercises.service';
import { ExtraexercisesService } from 'src/extraexercises/extraexercises.service';
import { Types } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly exercisesService:ExercisesService,
    private readonly extraExercisesService:ExtraexercisesService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('exam/:level')
  async generateExam(@Param('level') level:string){
    if (!["N1","N2","N3","N4","N5"].includes(level)) {
      throw new BadRequestException("Invalid level")
    }

    return this.appService.generateExam(level)
  }

  @Post("exam/correct")
  async correctExercises(@Body() body:RequestCorrectionDto){

    const totalAnswers = Promise.all(body.sectionAnswers.map(async (section)=>{
      const normalExercises = section.answers.filter(answer=>answer.type==="normal") as {
        questionId:Types.ObjectId;
        type:"normal";
        answer:number;
      }[]
      const corrections = await this.exercisesService.batchCorrectExercises(normalExercises)

      const extraExercises = section.answers.filter(answer=>answer.type==="extra") as {
        questionId:Types.ObjectId;
        type:"extra";
        answer: Record<number,number>;
      }[]

      const extraCorrections = await this.extraExercisesService.batchCorrectExercises(extraExercises)

      return {
        section:section.section,
        corrections:[...corrections,...extraCorrections]
      }
    }))

    return totalAnswers
  }

}
