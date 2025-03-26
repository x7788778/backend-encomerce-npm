## nestjs@common 常用方法
一、核心装饰器
1. 模块组织
装饰器	作用	示例
@Module()	定义模块	模块配置详解
@Global()	声明全局模块	@Global() @Module({...})
2. 控制器
装饰器	作用	示例
@Controller()	定义控制器路由前缀	@Controller('users')
@Get()/@Post()	定义HTTP方法	@Get(':id')
@Param()	获取路由参数	get(@Param('id') id: string)
@Query()	获取查询参数	@Query() pagination: PaginationDto
@Body()	获取请求体	@Body() createUserDto: CreateUserDto
@Headers()	获取请求头	@Headers('authorization') token
3. 提供者
装饰器	作用	示例
@Injectable()	声明可注入类	@Injectable() export class UserService
@Inject()	手动注入依赖	constructor(@Inject('CONN') private conn: Connection)
二、HTTP相关
1. 请求/响应修饰
装饰器	作用	示例
@Req()/@Request()	获取原生Request对象	@Req() req: Request
@Res()/@Response()	获取原生Response对象	@Res() res: Response
@Ip()	获取客户端IP	@Ip() ip: string
@Session()	获取Session对象	@Session() session: Record<string, any>
2. 状态码
装饰器	作用	示例
@HttpCode()	设置响应状态码	@HttpCode(204) delete()
@Header()	设置响应头	@Header('Cache-Control', 'none')
三、生命周期钩子
装饰器	触发时机	示例
@OnModuleInit()	模块初始化完成后	async onModuleInit() { ... }
@OnApplicationBootstrap()	应用启动后	onApplicationBootstrap()
@OnModuleDestroy()	模块销毁前	onModuleDestroy()
@BeforeApplicationShutdown()	应用关闭前	beforeApplicationShutdown()
四、异常处理
类/装饰器	作用	示例
HttpException	基础HTTP异常	throw new HttpException('Not Found', 404)
NotFoundException	404异常	throw new NotFoundException()
@Catch()	异常过滤器作用范围	@Catch(HttpException)
五、管道/守卫/拦截器
装饰器	作用	示例
@UsePipes()	应用参数管道	@UsePipes(ValidationPipe)
@UseGuards()	应用守卫	@UseGuards(JwtAuthGuard)
@UseInterceptors()	应用拦截器	@UseInterceptors(LoggingInterceptor)
六、实用工具
1. 类型工具
类型	作用	示例
Partial<T>	生成所有属性可选的新类型	Partial<User>
Omit<T, K>	排除指定属性后的新类型	Omit<User, 'password'>
2. 其他工具
方法	作用	示例
Logger	内置日志工具	private readonly logger = new Logger('App')
Version()	定义API版本	@Version('1') @Get()

## jwt
相关依赖
```npm install @nestjs/jwt passport-jwt passport```
