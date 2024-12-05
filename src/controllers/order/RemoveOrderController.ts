import { Request, Response } from "express";
import { RemoveOrderService } from "../../services/order/RemoveOrderService";
import { sendNotificationToDevice } from "../../config/firebase-config";  // Importando a função de notificação

class RemoveOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;
    const mesaNumero = req.query.mesaNumero as string; // Supondo que você receba o número da mesa como parâmetro
    const token = req.query.token as string; // O token do dispositivo do usuário

    const removeOrder = new RemoveOrderService();

    try {
      // Excluir o pedido
      const order = await removeOrder.execute({
        order_id,
      });

      // Enviar notificação para o dispositivo após a exclusão da mesa
      if (token && mesaNumero) {
        await sendNotificationToDevice(token, mesaNumero);  // Passando o número da mesa para a notificação
      }

      return res.json(order);
    } catch (error) {
      console.error('Erro ao remover o pedido:', error);
      return res.status(500).json({ error: 'Erro ao remover o pedido' });
    }
  }
}

export { RemoveOrderController };
