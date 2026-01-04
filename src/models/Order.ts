import mongoose, { Schema, Document } from 'mongoose';

export type OrderState = 'CREATED' | 'ANALYSIS' | 'COMPLETED';
export type OrderStatus = 'ACTIVE' | 'DELETED';
export type ServiceStatus = 'PENDING' | 'DONE';

export interface IService {
  name: string;
  value: number;
  status: ServiceStatus;
}

export interface IOrder extends Document {
  lab: string;
  patient: string;
  customer: string;
  state: OrderState;
  status: OrderStatus;
  services: IService[];
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'DONE'], default: 'PENDING' },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    lab: { type: String, required: true },
    patient: { type: String, required: true },
    customer: { type: String, required: true },
    state: { type: String, enum: ['CREATED', 'ANALYSIS', 'COMPLETED'], default: 'CREATED' },
    status: { type: String, enum: ['ACTIVE', 'DELETED'], default: 'ACTIVE' },
    services: { type: [serviceSchema], required: true },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', orderSchema);
