import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsSchema } from './schemas/events.schema';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Events', schema: EventsSchema}])
  ],
  providers: [EventsService],
  controllers: [EventsController]
})
export class EventsModule {}
