import * as mongoose from 'mongoose';

export const UserSchema= new mongoose.Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    birth: Date,
    img: String,
    created_at: {type: Date, default: Date.now}
})