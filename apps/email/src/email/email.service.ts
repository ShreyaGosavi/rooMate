import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { welcomeTemplate } from './templates/welcome.template';
import { verificationTemplate } from './templates/verification.template';
import { propertySubmittedTemplate } from './templates/property-submitted.template';
import { propertyApprovedTemplate } from './templates/property-approved.template';
import { propertyRejectedTemplate } from './templates/property-rejected.template';
import { communityRequestedTemplate } from './templates/community-requested.template';
import { communityRequestConfirmationTemplate } from './templates/community-request-confirmation.template';
import { communityApprovedTemplate } from './templates/community-approved.template';
import { communityRejectedTemplate } from './templates/community-rejected.template';
import { UserCreatedEvent } from '@roomate/shared-types';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY ?? '');
  }

  async sendWelcomeEmail(data: UserCreatedEvent): Promise<void> {
    const mail = welcomeTemplate(data.name);
    mail.to = data.email;
    await this.sendWithRetry(mail, 'welcome');
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const mail = verificationTemplate(email, token);
    await this.sendWithRetry(mail, 'verification');
  }

  async sendPropertySubmittedEmail(ownerEmail: string): Promise<void> {
    const mail = propertySubmittedTemplate(ownerEmail);
    await this.sendWithRetry(mail, 'property-submitted');
  }

  async sendPropertyApprovedEmail(ownerEmail: string): Promise<void> {
    const mail = propertyApprovedTemplate(ownerEmail);
    await this.sendWithRetry(mail, 'property-approved');
  }

  async sendPropertyRejectedEmail(ownerEmail: string): Promise<void> {
    const mail = propertyRejectedTemplate(ownerEmail);
    await this.sendWithRetry(mail, 'property-rejected');
  }

  async sendCommunityRequestedEmail(
    adminEmail: string,
    communityName: string,
    city: string,
    requestedByEmail: string,
  ): Promise<void> {
    const mail = communityRequestedTemplate(adminEmail, communityName, city, requestedByEmail);
    await this.sendWithRetry(mail, 'community-requested-admin');
  }

  async sendCommunityRequestConfirmationEmail(
    userEmail: string,
    communityName: string,
  ): Promise<void> {
    const mail = communityRequestConfirmationTemplate(userEmail, communityName);
    await this.sendWithRetry(mail, 'community-request-confirmation');
  }

  async sendCommunityApprovedEmail(ownerEmail: string, communityName: string): Promise<void> {
    const mail = communityApprovedTemplate(ownerEmail, communityName);
    await this.sendWithRetry(mail, 'community-approved');
  }

  async sendCommunityRejectedEmail(ownerEmail: string, communityName: string): Promise<void> {
    const mail = communityRejectedTemplate(ownerEmail, communityName);
    await this.sendWithRetry(mail, 'community-rejected');
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
