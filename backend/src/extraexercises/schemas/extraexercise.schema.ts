import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export type ExtraExerciseDocument = ExtraExercise & mongoose.Document;

@Schema({_id:false})
export class ExtraExerciseQuestion {
    @Prop({ 
        type:String,
        required:true
    })
    question:string;

    @Prop({
        type:[String],
        required:true
    })
    answers:string[]

    @Prop({
        type:Number,
        required:true
    })
    correct:number

    @Prop({
        type:String,
        required:false
    })
    explanation?:string

    @Prop({
        type:String,
        required:false
    })
    image?:string
}

@Schema()
export class ExtraExercise {
    _id:Types.ObjectId;

    @Prop({
        type:String,
        required:true
    })
    statement:string;

    @Prop({
        type:String,
        required:true
    })
    type:string;

    @Prop({
        type:[ExtraExerciseQuestion],
        required:true
    })
    questions:ExtraExerciseQuestion[];

    @Prop({
        type:String,
        required:true
    })
    category:string;

    @Prop({
        type:String,
        required:true
    })
    level:string;

    @Prop({
        type:String,
        required:false
    })
    image?:string;

    @Prop({
        type:String,
        required:false
    })
    audio?:string;

    @Prop({
        type:Number,
        required:false
    })
    year?:number;

    @Prop({
        type:String,
        required:false
    })
    period?:string;
}


export const ExtraExerciseSchema = SchemaFactory.createForClass(ExtraExercise);