## 401 token 3s异常
问题现象：
JWT token有效期异常(仅36秒)
访问受保护端点返回401未授权
排查方法：
使用jwt.io解码token查看exp/iat时间戳
检查.env配置JWT_EXPIRES_IN=36000(缺少时间单位)
检查auth.service.ts中sign方法配置
解决步骤：
修改.env添加时间单位：JWT_EXPIRES_IN=36000s
强制auth.service.ts设置expiresIn: '36000s'
重启服务使配置生效
验证方法：
获取新token检查exp-iat差值
测试访问受保护端点
解码token方法：

访问jwt.io
粘贴token内容
自动解析出payload中的：
iat(签发时间)
exp(过期时间)
其他声明信息