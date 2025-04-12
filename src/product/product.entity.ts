import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { Order } from '../order/order.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  name: string;
  // 商品名称


  @Column({ nullable: false })
  description: string;
  // 商品描述


  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;
  // 商品价格
  
  @Column({ nullable: false })
  stock: number;
  // 库存

  @OneToMany(() => Order, order => order.product)
  orders: Order[];
  // 订单列表
}