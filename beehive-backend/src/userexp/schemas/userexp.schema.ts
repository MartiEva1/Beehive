import * as mongoose from 'mongoose';

export const UserexpSchema= new mongoose.Schema({
    username: String,
    accepted: [String],
    refused: [String],
    past: [String],
})
