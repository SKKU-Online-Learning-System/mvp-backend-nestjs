import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication,  ExpressAdapter } from '@nestjs/platform-express';
// import { ExpressAdapter } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger/swagger.config';
import { join } from 'path';
const express = require('express');

async function bootstrap() {
   const server = express();
    const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );
  app.setGlobalPrefix('api');
   swaggerConfig(app);

   // middleware
   app.enableCors({
	credentials: true,
	origin: [
	   'http://localhost:3000',
	   'https://mrdang.cs.skku.edu',
	   'http://mrdang.cs.skku.edu',
	   'https://mrdang.cs.skku.edu:443',
   ],
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
   
   });

   // Block direct access to /api endpoint
   app.use('/api', (req, res, next) => {
      if (req.headers.referer) {
         const refererUrl = new URL(req.headers.referer);
      if (refererUrl.origin === 'https://mrdang.cs.skku.edu') {
         next();
      } else {
         res.status(403).send('Forbidden');
      }
      } else {
      res.status(403).send('Forbidden');
   }
   });
 

   app.use(helmet());
   app.use(cookieParser());
   app.use(
      morgan('[:date[iso]] :method :url :response-time ms\t:remote-addr'),
      //  - :remote-user\tHTTP/:http-version :res[content-length] ":referrer" ":user-agent
   );

   // static files
   app.useStaticAssets(join(__dirname, '..', 'public'));
   // app.useStaticAssets(join(__dirname, '..', 'public/images/banners'), {
   //    prefix: '/bannerImage',
   // });
   // app.useStaticAssets(join(__dirname, '..', 'public/images/courses'), {
   //    prefix: '/courseImage',
   // });
   // app.useStaticAssets(join(__dirname, '..', 'public/videos'), {
   //    prefix: '/video',
   // });

   // view engine
   app.setViewEngine('pug');
   app.setBaseViewsDir(`${__dirname}/../views`);

   app.useGlobalPipes(
      new ValidationPipe({
         transform: true,
         whitelist: true,
         forbidNonWhitelisted: true,
         validateCustomDecorators: true,
         disableErrorMessages: false,
      }),
   );

   await app.init();
   // await app.listen(4000);
   server.listen(4000);
}
bootstrap();