import { AppService } from 'src/app.service';
export declare class HomeController {
    private readonly appService;
    constructor(appService: AppService);
    getHome(): string;
}
