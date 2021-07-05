import { EventsService } from './events.service';
import { CreateEventsDTO } from './dto/create-events.dto';
export declare class EventsController {
    private eventsService;
    constructor(eventsService: EventsService);
    addEvent(res: any, createEventsDTO: CreateEventsDTO): Promise<any>;
    getAllEvents(res: any): Promise<any>;
    getEventsByCategory(res: any, category: any): Promise<any>;
    getevent(res: any, eventID: any): Promise<any>;
    updateEvent(res: any, eventID: any, createEventsDTO: CreateEventsDTO): Promise<any>;
    participateEvent(res: any, info: {
        username: string;
        eventID: string;
    }): Promise<any>;
    deleteEvent(res: any, eventID: any): Promise<any>;
}
