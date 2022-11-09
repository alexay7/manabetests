import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CodesController } from './codes.controller';
import { CodesService } from './codes.service';
import { CodeSchema } from './schemas/code.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Code', schema: CodeSchema }]),
],
  controllers: [CodesController],
  providers: [CodesService]
})
export class CodesModule {}
