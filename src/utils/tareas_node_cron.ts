import cron from "node-cron";
import pool from "../database/Connection";

const deleteNullUsers = async () => {
    try {
        await pool.connect();
        const request = pool.request();

        // Elimina usuarios nulos de la tabla 'usuario'
        await request.query('DELETE FROM USUARIO WHERE codigo IS NULL');
        // Elimina usuarios nulos de la tabla 'organizacion'
        // await request.query('DELETE FROM ORGANIZACIÓN WHERE estado IS NULL');
        console.log('Tarea programada completada: usuarios nulos eliminados');
    } catch (error) {
        console.error('Error al eliminar el registro:', error);
    }
}

// Programar la tarea para eliminar la cuenta después de 24 horas '0 0 0 * * *'
cron.schedule('* * * * *', deleteNullUsers)
console.log('activa');

export default cron;