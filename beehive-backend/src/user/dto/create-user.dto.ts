export class CreateUserDTO {
    readonly username: string;
    password: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly birth: Date;
    img: string;
    readonly created_at: Date;
}