import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param, Req } from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDTO} from './dto/create-user.dto';

const bcrypt= require('bcrypt');
const saltRounds= 10;

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    //add a user
    @Post('user')
    async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
        const plain_password= createUserDTO.password;
        await bcrypt.hash(plain_password, saltRounds).then(function(hash){
            createUserDTO.password = hash;
        });
        const user = await this.userService.addUser(createUserDTO);
        if (!user) throw new NotFoundException('Username already in use!');
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
    @Get('user/:username')
    async getUser(@Res() res, @Param('username') username) {
        const user = await this.userService.getUser(username);
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

    @Put('/updatePassword')
    async updatePassword(@Res() res, @Query('userID') userID, @Body() passwords: { username: string, oldPassword: string, newPassword: string }) {
        var user = await this.userService.getUser(passwords.username);
        if (!user) throw new NotFoundException('Username does not exists!');
        var reslt;
        await bcrypt.compare(passwords.oldPassword, user.password).then(function(result) {
            reslt=result
        });
        if (reslt==false) throw new NotFoundException('Invalid Password');
        else
        {
            await bcrypt.hash(passwords.newPassword, saltRounds).then(function(hash) {
                passwords.newPassword = hash;
            });
            this.userService.updatePassword(userID, passwords.newPassword);
            return res.status(HttpStatus.OK).json({
                message: "Password has been changed successfully",
            })
        }
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

    //LOGIN
    @Post('login')
    async login(@Res() res, @Body() credentials: {username: string, password: string}) {
        const user = await this.userService.getUser(credentials.username);
        if (!user) throw new NotFoundException('Username does not exists!');
        var reslt;
        await bcrypt.compare(credentials.password, user.password).then(function(result){
            reslt=result
        });
        if (reslt==false) throw new NotFoundException('Invalid Password');
        else{
            return res.status(HttpStatus.OK).json({
            message: "User has been logged successfully",
            user: user.username
            })
        }
    }

}
