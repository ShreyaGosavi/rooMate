import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { welcomeTemplate } from './templates/welcome.template';
import { UserCreatedEvent } from '@roomate/shared-types';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.resend = new Resend(process.env.RESEND_API_KEY ?? '');
  }

  async sendWelcomeEmail(data: UserCreatedEvent): Promise<void> {
    const mail = welcomeTemplate(data.name);
    mail.to = data.email;
    await this.sendWithRetry(mail, 'welcome');
  }

  private async sendWithRetry(
    mail: {
      to: string;
      from: { name: string; email: string };
      subject: string;
      html: string;
    },
    type: string,
    retries = 3,
  ): Promise<void> {
    const recipient = mail.to;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        await this.resend.emails.send({
          from: `${mail.from.name} <${mail.from.email}>`,
          to: recipient,
          subject: mail.subject,
          html: mail.html,
        });
        this.logger.log(`Email sent — type: ${type}, to: ${recipient}`);
        return;
      } catch (error: unknown) {
        const err = error instanceof Error ? error : new Error(String(error));

        this.logger.warn(
          `Email attempt ${attempt}/${retries} failed — type: ${type}, reason: ${err.message}`,
        );

        if (attempt === retries) {
          this.logger.error(
            `All ${retries} attempts failed — type: ${type}, to: ${recipient}`,
          );
          throw err;
        }

        await this.delay(attempt * 1000);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
