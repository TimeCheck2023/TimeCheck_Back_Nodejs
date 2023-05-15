import pool from "../database/Connection";
import EventsInterface from "../Interfaces/Events_interfaces";
import Events from "../Dto/Events_dto";
import querys from "../database/query";
import { formatDates } from "../utils/formatDates";

class EventsService implements EventsInterface {
    async getEvents(): Promise<Events[] | unknown> {
        try {
            const result = await pool.query(querys.getEvent)
            const formatData = formatDates(result.recordset)
            return formatData
        } catch (error) {
            throw error;
        }
    }
}

export default EventsService;