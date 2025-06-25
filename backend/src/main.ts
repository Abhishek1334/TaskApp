import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend communication
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'http://127.0.0.1:3000',
      // Add your Vercel frontend URL here (will be updated after frontend deployment)
      process.env.FRONTEND_URL || 'https://*.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Backend server is running on port ${port}`);
}

// For Vercel serverless functions
export default async (req: any, res: any) => {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'http://127.0.0.1:3000',
      process.env.FRONTEND_URL || 'https://*.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
};

// Keep the bootstrap for local development
if (require.main === module) {
  bootstrap();
} 