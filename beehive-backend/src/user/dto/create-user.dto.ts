export class CreateUserDTO {
    readonly username: string;
    password: string;
    first_name: string;
    last_name: string;
    birth: Date;
    img: string;
    readonly created_at: Date;
}