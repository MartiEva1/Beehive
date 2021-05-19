"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsSchema = void 0;
const mongoose = require("mongoose");
exports.EventsSchema = new mongoose.Schema({
    category: String,
    title: String,
    username: String,
    date: Date,
    hour: Date,
    place: { via: String, lat: String, long: String },
    description: String,
    img: String,
    partecipants: [String],
    is_passed: Boolean,
    created_at: { type: Date, default: Date.now }
});
//# sourceMappingURL=events.schema.js.map