## 问题账单
1、nest new 新建项目选用包管理器保持统一，混用容易导致依赖错乱
2、pnpm  安装sqlite3 会出现ts版本兼容问题，原生模块编译问题。
3、欲使用使用 TypeORM CLI 查看数据库结构。npx typeorm init 遇到与ts兼容问题，始终会覆盖ts版本

## 替代方案
项目内依赖统一使用npm管理



## ts语法学习
```Promise<Omit<User, 'password'>```
移出user的password类型，