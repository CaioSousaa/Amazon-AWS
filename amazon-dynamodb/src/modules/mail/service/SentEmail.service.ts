import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Task } from 'src/modules/task/domain/entities/Task';

@Injectable()
export class SentEmailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(task: Task) {
    const message = `the task has been resolved, this email was just to confirm its resolution!!!`;

    this.mailService.sendMail({
      from: 'Dynamodb application <dynamo.com>',
      to: task.recipient_email,
      subject: task.description,
      template: 'SentEmail',
      text: message,
    });
  }
}
