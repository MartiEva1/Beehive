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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
let HomeController = class HomeController {
    constructor(appService) {
        this.appService = appService;
    }
    getHome() {
        return this.appService.getHome();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], HomeController.prototype, "getHome", null);
HomeController = __decorate([
    common_1.Controller('home'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map