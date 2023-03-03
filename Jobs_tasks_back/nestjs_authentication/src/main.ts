import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerService } from "./logger/logger.service";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const logger: LoggerService = new LoggerService();

  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle("Authentication")
    .setDescription("The Authentication API description")
    .setVersion("1.0")
    .addTag("Authentication")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  logger.verbose(`Database URI => ${configService.get("database.uri")}`);
  logger.verbose(
    `Application listening on port => ${configService.get("port")}`
  );
  logger.verbose(
    `Application listening on port => ${configService.get("port")}`
  );
  await app.listen(configService.get("port"));
}
bootstrap();
