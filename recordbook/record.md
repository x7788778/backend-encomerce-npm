## 问题账单
1、nest new 新建项目选用包管理器保持统一，混用容易导致依赖错乱
2、pnpm  安装sqlite3 会出现ts版本兼容问题，原生模块编译问题。
3、欲使用使用 TypeORM CLI 查看数据库结构。npx typeorm init 遇到与ts兼容问题，始终会覆盖ts版本

## 替代方案
项目内依赖统一使用npm管理



## ts语法学习
```Promise<Omit<User, 'password'>```
移出user的password类型

## rabbit 实践问题
1. 保持统一的rabbit connection连接库
2. 保持统一的rabbit server 端配置，避免多处配置，比如只配置在rabbitmodule中火appmoduule中
3. amqp连接选用一致的库进行处理，避免冲突。可以使用@golevelup/nestjs-rabbitmq，风格与nest一致
3. rabbit消息流转模型
producer --> connection && open channel[1-n] --> rabbit server(exchange[type] --routing key--> queue[durable]) <----connection && open channel <--consumer[ack/nack]
- exchange type:
direct：精确匹配路由键。
topic：支持通配符匹配（如 products.*）。
fanout：广播消息到所有绑定的队列

-ack 机制：
成功消费消费者成功处理消息后想servver发送ack信号，server将次消息移除队列

-nack：
如果消费者无法处理消息，可以发送一个 nack（negative acknowledgment）或 reject。
RabbitMQ 可以根据配置决定是否将消息重新放回