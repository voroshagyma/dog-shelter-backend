import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [DogsController],
  providers: [DogsService],
  imports: [HttpModule]
})
export class DogsModule { }
