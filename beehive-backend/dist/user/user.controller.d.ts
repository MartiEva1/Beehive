import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    addUser(res: any, createUserDTO: CreateUserDTO): Promise<any>;
    getAllUser(res: any): Promise<any>;
    getUser(res: any, username: any): Promise<any>;
    updateUser(res: any, userID: any, createUserDTO: CreateUserDTO): Promise<any>;
    updatePassword(res: any, userID: any, passwords: {
        username: string;
        oldPassword: string;
        newPassword: string;
    }): Promise<any>;
    deleteUser(res: any, userID: any): Promise<any>;
    login(res: any, credentials: {
        username: string;
        password: string;
    }): Promise<any>;
}
