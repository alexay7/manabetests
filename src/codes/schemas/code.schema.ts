import mongoose from "mongoose";
import { Code } from "../interfaces/code.interface";

export const CodeSchema = new mongoose.Schema<Code>({
    code:String,
    encodedStats:String,
    encodedWrong:String
})