import Events from "../Dto/Events_dto";
import moment from 'moment'

export const formatDates = (data: Array<Events>) => {
    const datosFormateados = data.map(event => {
        const fecha_creacion_evento = moment(event.fecha_creacion_evento).format('YYYY-MM-DD HH:mm');
        const fecha_final_evento = moment(event.fecha_final_evento).format('YYYY-MM-DD HH:mm');
        const fecha_inicio_evento = moment(event.fecha_inicio_evento).format('YYYY-MM-DD HH:mm');    
        return { ...event, fecha_creacion_evento: fecha_creacion_evento, fecha_final_evento: fecha_final_evento, fecha_inicio_evento: fecha_inicio_evento };
    })
    return datosFormateados;

}