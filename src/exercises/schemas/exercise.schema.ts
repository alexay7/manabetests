import mongoose from 'mongoose';
import { Exercise } from '../interfaces/exercise.interface';

export const ExerciseSchema = new mongoose.Schema<Exercise>({
  question: String,
  answers: [String],
  correct: Number,
  explanation: String,
  type: String,
  category: String,
  level: String,
  time: Number,
  year: Number,
  period: String,
  typePosition: Number,
});

export type ExerciseDocument = Exercise & mongoose.Document;
