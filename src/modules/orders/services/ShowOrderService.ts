import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrderRepository from "../typeorm/repositories/OrderRepository";

interface IRequest{
    id: string;
}

export default class ShowOrderService{

    public async execute({id}: IRequest): Promise<Order>{
       const orderRepository = getCustomRepository(OrderRepository);
       const order = await orderRepository.findById(id);
       if(!order){
        throw new AppError('Order not found.');
       } 
       return order;
    }
}