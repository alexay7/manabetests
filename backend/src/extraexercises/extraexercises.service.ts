import { Injectable } from '@nestjs/common';
import { CreateExtraexerciseDto } from './dto/create-extraexercise.dto';
import { UpdateExtraexerciseDto } from './dto/update-extraexercise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ExtraExercise, ExtraExerciseDocument } from 'src/extraexercises/schemas/extraexercise.schema';
import { getRealExamQuestionNum } from 'src/helpers/helper';

@Injectable()
export class ExtraexercisesService {
  constructor(
    @InjectModel('ExtraExercise') private readonly extraExerciseModel: Model<ExtraExercise>,
  ) {}

  findAll() {
    return this.extraExerciseModel.find();
  }

  async generateSectionTest(
    level: string,
    sections: string[],
    questionNum: number,
    hideAnswers?: boolean,
  ): Promise<ExtraExerciseDocument[]> {
    const pipe = this.extraExerciseModel
      .aggregate()
      .match({ level: level, type: { $in: sections } })
      .sample(questionNum)
      .group({ _id: '$_id', result: { $push: '$$ROOT' } })
      .replaceRoot({ $first: '$result' });

    if (hideAnswers) return pipe.project({correct:0,explanation:0})

    return pipe;
  }

  async generateRealistExam(level:string){
    const distributions = getRealExamQuestionNum(level)

    const textgrammarQuestions = await this.generateSectionTest(
      level,
      ['gramaticatexto'],
      distributions.gramaticatexto,
      true
    )

    const textoscortosQuestions = await this.generateSectionTest(
      level,
      ['textoscortos'],
      distributions.textoscortos,
      true
    )

    const textosmediosQuestions = await this.generateSectionTest(
      level,
      ['textosmedios'],
      distributions.textosmedios,
      true
    )

    const textoslargosQuestions = await this.generateSectionTest(
      level,
      ['textoslargos'],
      distributions.textoslargos,
      true
    )

    const textosintegradosQuestions = await this.generateSectionTest(
      level,
      ['textosintegrados'],
      distributions.textosintegrados,
      true
    )

    const textostematicosQuestions = await this.generateSectionTest(
      level,
      ['textostematicos'],
      distributions.textostematicos,
      true
    )

    const textosinformacionQuestions = await this.generateSectionTest(
      level,
      ['textosinformacion'],
      distributions.textosinformacion,
      true
    )

    const tareasQuestions = await this.generateSectionTest(
      level,
      ['tareas'],
      distributions.tareas,
      true
    )

    const puntosclaveQuestions = await this.generateSectionTest(
      level,
      ['puntosclave'],
      distributions.puntosclave,
      true
    )

    const comprensiongeneralQuestions = await this.generateSectionTest(
      level,
      ['comprensiongeneral'],
      distributions.comprensiongeneral,
      true
    )

    const expresionesQuestions = await this.generateSectionTest(
      level,
      ['expresiones'],
      distributions.expresiones,
      true
    )

    const respuestarapidaQuestions = await this.generateSectionTest(
      level,
      ['respuestarapida'],
      distributions.respuestarapida,
      true
    )

    const comprensionintegradaQuestions = await this.generateSectionTest(
      level,
      ['comprensionintegrada'],
      distributions.comprensionintegrada,
      true
    )

    return textgrammarQuestions
      .concat(textoscortosQuestions)
      .concat(textosmediosQuestions)
      .concat(textoslargosQuestions)
      .concat(textosintegradosQuestions)
      .concat(textostematicosQuestions)
      .concat(textosinformacionQuestions)
      .concat(tareasQuestions)
      .concat(puntosclaveQuestions)
      .concat(comprensiongeneralQuestions)
      .concat(expresionesQuestions)
      .concat(respuestarapidaQuestions)
      .concat(comprensionintegradaQuestions);
  }

  async batchCorrectExercises(answers:{questionId:Types.ObjectId,answer:Record<number,number>}[]){
    const result:{questionId:string, correct:boolean, explanation?:string,type:string}[] = []

    // The questionId will be the _id of the exercise + the index of the question in the array
    await Promise.all(answers.map(async (answer)=>{
      const found = await this.extraExerciseModel.findById(answer.questionId)

      if(!found) return

      found.questions.forEach((question,index)=>{
        if(question.correct === answer.answer[index]){
          result.push({questionId:`${answer.questionId}-${index}`,correct:true,explanation:question.explanation,type:found.type})
        }else{
          result.push({questionId:`${answer.questionId}-${index}`,correct:false,explanation:question.explanation,type:found.type})
        }
      })
    }))

    return result
  }
}
