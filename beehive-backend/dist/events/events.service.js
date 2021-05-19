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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let EventsService = class EventsService {
    constructor(eventsModel) {
        this.eventsModel = eventsModel;
    }
    async getAllEvents() {
        const events = await this.eventsModel.find().exec();
        return events;
    }
    async getEventsbycat(cat) {
        const events = await this.eventsModel.find({ category: cat }).exec();
        return events;
    }
    async getEvent(eventID) {
        const event = await this.eventsModel.findById(eventID).exec();
        return event;
    }
    async addEvent(createEventsDTO) {
        const newEvent = await new this.eventsModel(createEventsDTO);
        return newEvent.save();
    }
    async updateEvent(eventID, createEventsDTO) {
        const updatedUser = await this.eventsModel
            .findByIdAndUpdate(eventID, createEventsDTO, { new: true });
        return updatedUser;
    }
    async deleteEvent(eventID) {
        const deletedEvent = await this.eventsModel.findByIdAndRemove(eventID);
        return deletedEvent;
    }
};
EventsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Events')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map