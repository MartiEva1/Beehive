"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const bcrypt = require('bcrypt');
const saltRounds = 10;
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async addUser(res, createUserDTO) {
        const plain_password = createUserDTO.password;
        await bcrypt.hash(plain_password, saltRounds).then(function (hash) {
            createUserDTO.password = hash;
        });
        const user = await this.userService.addUser(createUserDTO);
        if (!user)
            throw new common_1.NotFoundException('Username already in use!');
        return res.status(common_1.HttpStatus.OK).json({
            message: "User has been created successfully",
            user
        });
    }
    async getAllUser(res) {
        const users = await this.userService.getAllUser();
        return res.status(common_1.HttpStatus.OK).json(users);
    }
    async getUser(res, username) {
        const user = await this.userService.getUser(username);
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        return res.status(common_1.HttpStatus.OK).json(user);
    }
    async updateUser(res, userID, createUserDTO) {
        const user = await this.userService.updateUser(userID, createUserDTO);
        if (!user)
            throw new common_1.NotFoundException('User does not exist!');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'User has been successfully updated',
            user
        });
    }
    async deleteUser(res, userID) {
        const user = await this.userService.deleteUser(userID);
        if (!user)
            throw new common_1.NotFoundException('User does not exist');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'User has been deleted',
            user
        });
    }
    async login(res, credentials) {
        const user = await this.userService.getUser(credentials.username);
        if (!user)
            throw new common_1.NotFoundException('Username does not exists!');
        var reslt;
        await bcrypt.compare(credentials.password, user.password).then(function (result) {
            reslt = result;
        });
        if (reslt == false)
            throw new common_1.NotFoundException('Invalid Password');
        else {
            return res.status(common_1.HttpStatus.OK).json({
                message: "User has been logged successfully",
                user: user.username
            });
        }
    }
};
__decorate([
    common_1.Post('user'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    common_1.Get('users'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
__decorate([
    common_1.Get('user/:username'),
    __param(0, common_1.Res()), __param(1, common_1.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    common_1.Put('/update'),
    __param(0, common_1.Res()), __param(1, common_1.Query('userID')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    common_1.Delete('/delete'),
    __param(0, common_1.Res()), __param(1, common_1.Query('userID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map