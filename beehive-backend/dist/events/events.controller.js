"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const create_events_dto_1 = require("./dto/create-events.dto");
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async addEvent(res, createEventsDTO) {
        const event = await this.eventsService.addEvent(createEventsDTO);
        return res.status(common_1.HttpStatus.OK).json({
            message: "Event has been created successfully",
            event
        });
    }
    async getAllEvents(res) {
        const events = await this.eventsService.getAllEvents();
        return res.status(common_1.HttpStatus.OK).json(events);
    }
    async getEventsbyCat(res, category) {
        const events = await this.eventsService.getEventsbycat(category);
        return res.status(common_1.HttpStatus.OK).json(events);
    }
    async getevent(res, eventID) {
        const event = await this.eventsService.getEvent(eventID);
        if (!event)
            throw new common_1.NotFoundException('This Event does not exist!');
        return res.status(common_1.HttpStatus.OK).json(event);
    }
    async updateEvent(res, eventID, createEventsDTO) {
        const event = await this.eventsService.updateEvent(eventID, createEventsDTO);
        if (!event)
            throw new common_1.NotFoundException('Event does not exist!');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Event has been successfully updated',
            event
        });
    }
    async participateEvent(res, info) {
        const event = await this.eventsService.getEvent(info.eventID);
        if (!event)
            throw new common_1.NotFoundException('This Event does not exist!');
        event.partecipants.push(info.username);
        await this.eventsService.updateEvent(info.eventID, event);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Partecipant added to the event',
            event
        });
    }
    async deleteEvent(res, eventID) {
        const event = await this.eventsService.deleteEvent(eventID);
        if (!event)
            throw new common_1.NotFoundException('Event does not exist');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Event has been deleted',
            event
        });
    }
};
__decorate([
    common_1.Post('event'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_events_dto_1.CreateEventsDTO]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "addEvent", null);
__decorate([
    common_1.Get('events'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getAllEvents", null);
__decorate([
    common_1.Get('category/:category'),
    __param(0, common_1.Res()), __param(1, common_1.Param('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getEventsbyCat", null);
__decorate([
    common_1.Get('event/:eventID'),
    __param(0, common_1.Res()), __param(1, common_1.Param('eventID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getevent", null);
__decorate([
    common_1.Put('/update'),
    __param(0, common_1.Res()), __param(1, common_1.Query('eventID')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_events_dto_1.CreateEventsDTO]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "updateEvent", null);
__decorate([
    common_1.Post('/accept'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "participateEvent", null);
__decorate([
    common_1.Delete('/delete'),
    __param(0, common_1.Res()), __param(1, common_1.Query('eventID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "deleteEvent", null);
EventsController = __decorate([
    common_1.Controller('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map