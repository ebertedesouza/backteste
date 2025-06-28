import { Request, Response } from "express";
import { UpdateOrderService } from "../../services/order/UpdateOrderService";

class UpdateOrderController {
  async handle(req: Request, res: Response) {
    const { order_id, table } = req.body;

    if (!order_id || !table) {
      return res.status(400).json({ message: "order_id e table são obrigatórios" });
    }

    const service = new UpdateOrderService();

    try {
      const order = await service.execute({ order_id, table });
      return res.json(order);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Erro interno" });
    }
  }
}

export { UpdateOrderController };
