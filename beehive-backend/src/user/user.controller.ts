import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDTO} from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    //add a user
    @Post('user')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.addUser(createUserDTO);
        return res.status(HttpStatus.OK).json({
            message: "User has been created successfully",
            user
        })
    }

    // Retrieve user list
    @Get('users')
    async getAllUser(@Res() res) {
        const users = await this.userService.getAllUser();
        return res.status(HttpStatus.OK).json(users);
    }

    // Fetch a particular user using ID
    @Get('user/:userID')
    async getUser(@Res() res, @Param('userID') userID) {
        const user = await this.userService.getUser(userID);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    //update a user's details
    @Put('/update')
    async updateUser(@Res() res, @Query('userID') userID, @Body() createUserDTO: CreateUserDTO) {
        const user = await this.userService.updateUser(userID, createUserDTO);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully updated',
            user
        });
    }

    // Delete a user
    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID) {
        const user = await this.userService.deleteUser(userID);
        if (!user) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted',
            user
        })
    }

}
