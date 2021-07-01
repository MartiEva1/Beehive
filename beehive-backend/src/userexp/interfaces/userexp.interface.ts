import {Document} from 'mongoose';

export interface Userexp extends Document {
    readonly username: String;
    accepted: [String];
    refused: [String];
    past: [String];
}
