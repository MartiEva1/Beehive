import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { UserexpModule } from './userexp/userexp.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/beehive-app',{useNewUrlParser: true}),
    UserModule,
    EventsModule,
    UserexpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
