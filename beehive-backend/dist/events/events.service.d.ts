import { Model } from 'mongoose';
import { Events } from './interfaces/events.interface';
import { CreateEventsDTO } from './dto/create-events.dto';
export declare class EventsService {
    private readonly eventsModel;
    constructor(eventsModel: Model<Events>);
    getAllEvents(): Promise<Events[]>;
    getEventsbycat(cat: any): Promise<Events[]>;
    getEvent(eventID: any): Promise<Events>;
    addEvent(createEventsDTO: CreateEventsDTO): Promise<Events>;
    updateEvent(eventID: any, createEventsDTO: CreateEventsDTO): Promise<Events>;
    deleteEvent(eventID: any): Promise<any>;
}
