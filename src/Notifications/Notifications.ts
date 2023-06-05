import express, { Request, Response } from "express";
import { Expo, ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";
const router = express.Router();
const expo = new Expo();

router.post("/enviar-notificacion", async(req: Request, res: Response) => {
  const { token, mensaje } = req.body;

  // Validar el token de notificación y el mensaje

  const mensajePush: ExpoPushMessage = {
    to: token,
    sound: "default",
    body: mensaje,
    data: { mensajePersonalizado: mensaje },
  };

  try {
    const tickets: ExpoPushTicket[] = await expo.sendPushNotificationsAsync([
      mensajePush,
    ]);
    // Manejar la respuesta del envío de notificaciones (tickets)
    res.send("Notificación enviada correctamente");
  } catch (error) {
    // Manejar errores
    res.status(500).send("Error al enviar la notificación");
  }
});


export default router