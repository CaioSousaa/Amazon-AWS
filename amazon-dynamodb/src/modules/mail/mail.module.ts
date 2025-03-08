import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { SentEmailService } from './service/SentEmail.service';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST!,
        secure: false,
        auth: {
          user: process.env.MAIL_USER!,
          pass: process.env.MAIL_PASS!,
        },
      },
      template: {
        dir: join(process.cwd(), 'src', 'modules', 'mail', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [SentEmailService],
})
export class MailModule {}
