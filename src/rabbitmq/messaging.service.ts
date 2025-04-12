import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class MessagingService implements OnModuleInit {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async onModuleInit() {
    const maxRetries = 5;
    const retryDelay = 3000; // 3秒
    
    // 确保amqpConnection已初始化
    if (!this.amqpConnection) {
      throw new Error('RabbitMQ connection not initialized');
    }

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // 检查连接状态
        if (this.amqpConnection?.connected) {
          console.log('RabbitMQ connection established successfully');
          break;
        }

        console.log(`Attempt ${attempt}/${maxRetries}: Waiting for RabbitMQ connection...`);
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        } else {
          throw new Error('Failed to establish RabbitMQ connection after maximum retries');
        }
      } catch (error) {
        console.error(`RabbitMQ connection attempt ${attempt} failed:`, error);
        if (attempt === maxRetries) {
          throw new Error(`Failed to connect to RabbitMQ after ${maxRetries} attempts`);
        }
      }
    }

    // 添加连接监听器
    if (this.amqpConnection.managedConnection) {
      this.amqpConnection.managedConnection.on('connect', () => {
        console.log('RabbitMQ connected');
      });
      
      this.amqpConnection.managedConnection.on('disconnect', (err) => {
        console.error('RabbitMQ disconnected', err);
      });
    }
  }

  public async publish(exchange: string, routingKey: string, message: any) {
    if (!this.amqpConnection.connected) {
      throw new Error('RabbitMQ not connected');
    }

    console.log('Publishing message to RabbitMQ:', { exchange, routingKey, message });
    await this.amqpConnection.publish(exchange, routingKey, message);
  }
}
