import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param, Req } from '@nestjs/common';
import {EventsService} from './events.service';
import {CreateEventsDTO} from './dto/create-events.dto';

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    //add an event
    @Post('event')
    async addEvent(@Res() res, @Body() createEventsDTO: CreateEventsDTO) {
        const event = await this.eventsService.addEvent(createEventsDTO);
        return res.status(HttpStatus.OK).json({
            message: "Event has been created successfully",
            event
        })
    }

    // Retrieve event list
    @Get('events')
    async getAllEvents(@Res() res) {
        const events = await this.eventsService.getAllEvents();
        return res.status(HttpStatus.OK).json(events);
    }

    // Retrieve event list by category
    @Get('category/:category')
    async getEventsbyCat(@Res() res,  @Param('category') category) {
        const events = await this.eventsService.getEventsbycat(category);
        return res.status(HttpStatus.OK).json(events);
    }

    // Fetch a particular event using ID
    @Get('event/:eventID')
    async getevent(@Res() res, @Param('eventID') eventID) {
        const event = await this.eventsService.getEvent(eventID);
        if (!event) throw new NotFoundException('This Event does not exist!');
        return res.status(HttpStatus.OK).json(event);
    }

    //update a event's details
    @Put('/update')
    async updateEvent(@Res() res, @Query('eventID') eventID, @Body() createEventsDTO: CreateEventsDTO) {
        const event = await this.eventsService.updateEvent(eventID, createEventsDTO);
        if (!event) throw new NotFoundException('Event does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Event has been successfully updated',
            event
        });
    }

    //Add participant
    @Post('/accept')
    async participateEvent(@Res() res, @Body() info: {username: string, eventID: string}) {
        const event = await this.eventsService.getEvent(info.eventID);
        if (!event) throw new NotFoundException('This Event does not exist!');
        event.partecipants.push(info.username);
        await this.eventsService.updateEvent(info.eventID, event);
        return res.status(HttpStatus.OK).json({
            message: 'Partecipant added to the event',
            event
        });
    }

    // Delete an event
    @Delete('/delete')
    async deleteEvent(@Res() res, @Query('eventID') eventID) {
        const event = await this.eventsService.deleteEvent(eventID);
        if (!event) throw new NotFoundException('Event does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Event has been deleted',
            event
        })
    }

}
