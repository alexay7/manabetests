import { Injectable } from '@nestjs/common';
import { ExercisesService } from 'src/exercises/exercises.service';
import { ExtraexercisesService } from 'src/extraexercises/extraexercises.service';

@Injectable()
export class AppService {
  constructor(
    private readonly exercisesService:ExercisesService,
    private readonly extraExercisesService:ExtraexercisesService
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  async generateExam(level:string){
    const exercises = await this.exercisesService.generateRealishTest(level);

    const extraExercises = await this.extraExercisesService.generateRealistExam(level);

    return {
      exercises,
      extraExercises
    }
  }
}
