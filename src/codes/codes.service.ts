import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from "mongoose"
import { CreateCodeDto } from './dto/create-code.dto';
import { Code } from './interfaces/code.interface';

@Injectable()
export class CodesService {
    constructor(
        @InjectModel('Code') private readonly codesModel: Model<Code>,
      ) {}

    async create(createCodeDto:CreateCodeDto){
        return this.codesModel.create(createCodeDto);
    }

    async find(code:string){
        return this.codesModel.findOne({code});
    }
}
