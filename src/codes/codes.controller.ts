import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CodesService } from './codes.service';
import { CreateCodeDto } from './dto/create-code.dto';

@Controller('codes')
export class CodesController {
    constructor(private readonly codesService: CodesService) {}

    @Post("create")
    async createCode(@Body() createCodeDto:CreateCodeDto){
        return this.codesService.create(createCodeDto);
    }

    @Get(":codeId")
    async getCode(@Param("codeId") codeId:string){
        return this.codesService.find(codeId);
    }
}
