import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333, () =>
    console.log('amazon dynamoDB aplication is run 🚀'),
  );
}
bootstrap();
