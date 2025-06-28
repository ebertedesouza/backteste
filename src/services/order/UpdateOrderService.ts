import prismaClient from "../../prisma";

interface UpdateOrderRequest {
  order_id: string;
  table: number;
}

class UpdateOrderService {
  async execute({ order_id, table }: UpdateOrderRequest) {
    const orderExists = await prismaClient.order.findUnique({
      where: { id: order_id }
    });

    if (!orderExists) {
      throw new Error("Pedido não encontrado");
    }

    const orderUpdated = await prismaClient.order.update({
      where: { id: order_id },
      data: { table }
    });

    return orderUpdated;
  }
}

export { UpdateOrderService };
