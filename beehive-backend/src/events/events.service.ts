import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Events} from './interfaces/events.interface';
import {CreateEventsDTO} from './dto/create-events.dto';

@Injectable()
export class EventsService {
    constructor(@InjectModel('Events') private readonly eventsModel: Model<Events>) { }
    // fetch all events
    async getAllEvents(): Promise<Events[]> {
        const events = await this.eventsModel.find().exec();
        return events;
    }
    // Get events by category
    async getEventsbycat(cat): Promise<Events[]> {
        const events = await this.eventsModel.find({category: cat}).exec();
        return events;
    }
    // Get a single event
    async getEvent(eventID): Promise<Events> {
        const event = await this.eventsModel.findById(eventID).exec();
        return event;
    }
    // post a single event
    async addEvent(createEventsDTO: CreateEventsDTO): Promise<Events> {
        const newEvent = await new this.eventsModel(createEventsDTO);
        return newEvent.save();
    }
    // Edit events details
    async updateEvent(eventID, createEventsDTO: CreateEventsDTO): Promise<Events> {
        const updatedUser = await this.eventsModel
            .findByIdAndUpdate(eventID, createEventsDTO, { new: true });
        return updatedUser;
    }
    // Delete a event
    async deleteEvent(eventID): Promise<any> {
        const deletedEvent = await this.eventsModel.findByIdAndRemove(eventID);
        return deletedEvent;
    }

}
