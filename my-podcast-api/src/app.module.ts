import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { ConfigModule } from './config/config.module';
import { TopicsModule } from './topics/topics.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportAuthController } from './auth/passport-auth.controller';

@Module({
  imports: [
    EpisodesModule,
    ConfigModule,
    TopicsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, PassportAuthController],
  providers: [AppService],
})
export class AppModule {}
