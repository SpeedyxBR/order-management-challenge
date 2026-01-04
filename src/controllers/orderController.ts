import { Response } from 'express';
import { Order } from '../models/Order';
import { AuthRequest } from '../middlewares/authMiddleware';

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { lab, patient, customer, services } = req.body;

    if (!lab || !patient || !customer) {
      res.status(400).json({ error: 'Lab, patient e customer são obrigatórios' });
      return;
    }

    if (!services || !Array.isArray(services) || services.length === 0) {
      res.status(400).json({ error: 'Serviços são obrigatórios' });
      return;
    }

    const totalValue = services.reduce((sum: number, s: { value: number }) => sum + s.value, 0);
    if (totalValue <= 0) {
      res.status(400).json({ error: 'Valor total dos serviços deve ser maior que zero' });
      return;
    }

    const order = await Order.create({
      lab,
      patient,
      customer,
      services,
      state: 'CREATED',
      status: 'ACTIVE',
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pedido' });
  }
};

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { state, page = 1, limit = 10 } = req.query;

    const filter: { status: string; state?: string } = { status: 'ACTIVE' };
    if (state) {
      filter.state = state as string;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const orders = await Order.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(filter);

    res.json({
      orders,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pedidos' });
  }
};
