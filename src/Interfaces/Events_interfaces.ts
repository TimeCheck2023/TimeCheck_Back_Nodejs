import Events from "../Dto/Events_dto";

export default interface EventsInterface {
    getEvents(): Promise<Events[] | unknown>;
}