# 使用官方的Node.js镜像作为基础镜像
FROM node:18.20.5

# 设置工作目录
WORKDIR /app

# 将项目文件复制到容器内的工作目录
COPY . .

# 安装项目依赖
RUN npm install

# 构建项目（如果有构建步骤）
RUN npm run build

# 暴露应用程序端口（根据实际情况修改）
EXPOSE 3001

# 定义容器启动时要执行的命令
CMD ["npm","run", "start:prod"]