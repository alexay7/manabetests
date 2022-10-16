import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getLevelQuestions } from 'src/helpers/helper';
import { Exercise } from './interfaces/exercise.interface';
import { ExerciseDocument } from './schemas/exercise.schema';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel('Exercise') private readonly exerciseModel: Model<Exercise>,
  ) {}

  async generateCategoryTest(
    level: string,
    category: string,
    questionNum: number,
  ): Promise<ExerciseDocument[]> {
    return this.exerciseModel
      .aggregate()
      .match({ level: level, category: category })
      .sample(questionNum)
      .group({ _id: '$_id', result: { $push: '$$ROOT' } })
      .replaceRoot({ $first: '$result' });
  }

  async generateSectionTest(
    level: string,
    sections: string[],
    questionNum: number,
  ): Promise<ExerciseDocument[]> {
    return this.exerciseModel
      .aggregate()
      .match({ level: level, type: { $in: sections } })
      .sample(questionNum)
      .group({ _id: '$_id', result: { $push: '$$ROOT' } })
      .replaceRoot({ $first: '$result' });
  }

  async generateRandomTest(level: string, questionNum: number) {
    const distributions = getLevelQuestions(level, questionNum);

    const kanjiQuestions = await this.generateSectionTest(
      level,
      ['kanji'],
      distributions.kanji,
    );

    const parafrasesQuestions = await this.generateSectionTest(
      level,
      ['parafrases'],
      distributions.parafrases,
    );

    let ortografiaQuestions = [];
    if (distributions.ortografia > 0) {
      ortografiaQuestions = await this.generateSectionTest(
        level,
        ['ortografia'],
        distributions.ortografia,
      );
    }

    const ordenarQuestions = await this.generateSectionTest(
      level,
      ['ordenar'],
      distributions.ordenar,
    );

    let usoQuestions = [];
    if (distributions.uso > 0) {
      usoQuestions = await this.generateSectionTest(
        level,
        ['uso'],
        distributions.uso,
      );
    }

    const gramaticafrasesQuestions = await this.generateSectionTest(
      level,
      ['gramaticafrases'],
      distributions.gramaticafrases,
    );

    let formacionQuestions = [];
    if (distributions.formacion > 0) {
      formacionQuestions = await this.generateSectionTest(
        level,
        ['formacion'],
        distributions.formacion,
      );
    }

    const contextoQuestions = await this.generateSectionTest(
      level,
      ['contexto'],
      distributions.contexto,
    );

    return kanjiQuestions
      .concat(parafrasesQuestions)
      .concat(ortografiaQuestions)
      .concat(formacionQuestions)
      .concat(contextoQuestions)
      .concat(usoQuestions)
      .concat(gramaticafrasesQuestions)
      .concat(ordenarQuestions);
  }

  async getRealTest(
    level: string,
    year: number,
    period: string,
  ): Promise<ExerciseDocument[]> {
    return this.exerciseModel
      .find({
        level: level,
        year: year,
        period: period,
      })
      .sort({ typePosition: 1 });
  }

  async getExercises(
    level:string,
    section:string,
    skip:number
  ):Promise<ExerciseDocument[]>{
    const totalExercises = await this.exerciseModel.find({
      level:level,
      type:section,
    }).countDocuments()
    if(skip<totalExercises){
      return this.exerciseModel.find({
        level:level,
        type:section,
      }).skip(skip).limit(10);
    }else{
      return this.generateSectionTest(level,[section],10);
    }
  }

  async getWrongExercises(exercises:Types.ObjectId[]):Promise<ExerciseDocument[]>{
    const result = []
    await Promise.all(exercises.map(async (exerciseId)=>{
      const found = await this.exerciseModel.findById(exerciseId)
      result.push(found)
    }))
    return result
  }
}
