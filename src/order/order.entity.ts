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
  // 商品

  @Column({ type: 'integer' })
  quantity: number;
  // 购买数量

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  totalPrice: number;
  // 总价

  @Column({
    type: 'enum',
    enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'],
    default: 'pending'
  })
  status: string;
  // 订单状态

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
    