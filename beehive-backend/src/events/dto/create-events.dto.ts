
export class CreateEventsDTO {
    readonly category: String;
    readonly title: String;
    readonly username: String;
    readonly date: Date;
    readonly hour: Date;
    readonly place: {via: String, lat: String, long: String};
    readonly description: String;
    img: String;
    partecipants: [String];
    is_passed: Boolean;
    readonly created_at: Date;
}
