// src/order/order.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @ManyToOne(() => Product, product => product.orders)
  product: Product;
  //商品

  @Column({ type: 'int' })
  quantity: number;
  //购买数量

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;
  //总价

  @Column({ 
    type: 'text', 
    enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'], 
    default: 'pending' 
  })
  status: string;
  //订单状态

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}