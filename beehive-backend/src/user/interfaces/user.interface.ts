import {Document} from 'mongoose';

export interface User extends Document {
    readonly username: string;
    readonly password: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly birth: Date;
    readonly img: string;
    readonly created_at: Date;
}