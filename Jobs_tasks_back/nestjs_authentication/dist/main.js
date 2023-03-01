"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_service_1 = require("./logger/logger.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const logger = new logger_service_1.LoggerService();
    app.enableCors();
    logger.verbose(`Database URI => ${configService.get('database.uri')}`);
    logger.verbose(`Application listening on port => ${configService.get('port')}`);
    await app.listen(configService.get('port'));
}
bootstrap();
//# sourceMappingURL=main.js.map