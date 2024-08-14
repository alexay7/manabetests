import { Module } from '@nestjs/common';
import { ExtraexercisesService } from './extraexercises.service';
import { ExtraexercisesController } from './extraexercises.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExtraExerciseSchema } from 'src/extraexercises/schemas/extraexercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ExtraExercise', schema: ExtraExerciseSchema }]),
],
  controllers: [ExtraexercisesController],
  providers: [ExtraexercisesService],
  exports: [ExtraexercisesService]
})
export class ExtraexercisesModule {}