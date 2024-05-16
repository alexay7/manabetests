import { IsString } from "class-validator";
import { Code } from "../interfaces/code.interface";

export class CreateCodeDto implements Code{
@IsString()
code: string;

@IsString()
encodedStats: string;

@IsString()
encodedWrong: string;
}