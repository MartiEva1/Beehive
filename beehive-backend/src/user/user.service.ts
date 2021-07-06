import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {User} from './interfaces/user.interface';
import {CreateUserDTO} from './dto/create-user.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    // fetch all user
    async getAllUser(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }
    // Get a single user
    async getUser(username): Promise<User> {
        //const user = await this.userModel.findById(userID).exec();
        const user= await this.userModel.findOne({username: username}).exec();
        return user;
    }
    // post a single user
    async addUser(createUserDTO: CreateUserDTO): Promise<User> {
        let user = await this.getUser(createUserDTO.username);
        if(!user){
            const newUser = await new this.userModel(createUserDTO);
            return newUser.save();
        }
        return null;
    }
    // Edit user details
    async updateUser(userID, createUserDTO: CreateUserDTO): Promise<User> {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userID, createUserDTO, { new: true });
        return updatedUser;
    }
    // Delete a user
    async deleteUser(userID): Promise<any> {
        const deletedUser = await this.userModel.findByIdAndRemove(userID);
        return deletedUser;
    }

    // Edit user password
    async updatePassword(userID, newPassword: string): Promise<User> {
        const updatedUser = await this.userModel
            .findByIdAndUpdate(userID, { password: newPassword });
        return updatedUser;
    }
}
