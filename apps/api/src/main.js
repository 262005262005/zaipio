"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ============================================================
// ZAIPIO — NestJS API Entry Point
// ============================================================
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // Global validation pipe
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    // CORS
    app.enableCors({
        origin: [
            process.env.APP_URL || 'http://localhost:3000',
            process.env.ADMIN_URL || 'http://localhost:3001',
        ],
        credentials: true,
    });
    // API prefix
    app.setGlobalPrefix('api/v1');
    // Swagger docs
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ZAIPIO API')
        .setDescription('Multi-Platform E-commerce Seller Tool — API Documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`🚀 ZAIPIO API running on: http://localhost:${port}`);
    console.log(`📚 Swagger docs: http://localhost:${port}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map