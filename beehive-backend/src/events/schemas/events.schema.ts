import * as mongoose from 'mongoose';

export const EventsSchema= new mongoose.Schema({
    category: String,
    title: String,
    username: String,
    date: Date,
    hour: Date,
    place: {via: String, lat: String, long: String},
    description: String,
    img: String,
    partecipants: [String],
    is_passed: Boolean,
    created_at: {type: Date, default: Date.now}
})