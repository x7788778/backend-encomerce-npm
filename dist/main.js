"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
console.log(process.env.PORT, 'prot');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // app.setGlobalPrefix('api');
    app.enableCors();
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map