import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKeyStrategy } from 'src/auth/strategy/apiKey-strategy';
import { ApiKey } from 'src/database/entities/api-key.entity';
import { Application } from 'src/database/entities/application.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([ApiKey, Application])],
  providers: [AuthService, ApiKeyStrategy],
  exports: [AuthService],
})
export class AuthModule {}
