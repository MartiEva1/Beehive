import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    getAllUser(): Promise<User[]>;
    getUser(username: any): Promise<User>;
    addUser(createUserDTO: CreateUserDTO): Promise<User>;
    updateUser(userID: any, createUserDTO: CreateUserDTO): Promise<User>;
    deleteUser(userID: any): Promise<any>;
}
