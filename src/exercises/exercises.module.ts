import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseSchema } from './schemas/exercise.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: 'Exercise', schema: ExerciseSchema }]),
  ],
  providers: [ExercisesService],
  controllers: [ExercisesController],
})
export class ExercisesModule {}
