import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DogsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
