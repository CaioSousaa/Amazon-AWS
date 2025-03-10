import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SentEmailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(recipient_email: string, description: string) {
    const message = `the task has been resolved, this email was just to confirm its resolution!!!`;

    this.mailService.sendMail({
      from: 'Dynamodb application <dynamo.com>',
      to: recipient_email,
      subject: description,
      template: 'SentEmail',
      text: message,
    });
  }
}
