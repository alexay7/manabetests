import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ExercisesModule } from './exercises/exercises.module';
import { CodesModule } from './codes/codes.module';
import { ExtraexercisesModule } from './extraexercises/extraexercises.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ExercisesModule,
    CodesModule,
    ExtraexercisesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
