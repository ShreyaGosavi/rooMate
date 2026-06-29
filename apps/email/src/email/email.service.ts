import { Injectable, Logger } from '@nestjs/common';
import sgMail from '@sendgrid/mail';
import { communitySubmittedTemplate } from './templates/community-submitted.template';
import { communityApprovedTemplate } from './templates/community-approved.template';
import { communityRejectedTemplate } from './templates/community-rejected.template';
import { welcomeTemplate } from './templates/welcome.template';
import { verificationTemplate } from './templates/verification.template';
import { propertySubmittedTemplate } from './templates/property-submitted.template';
import { propertyApprovedTemplate } from './templates/property-approved.template';
import { propertyRejectedTemplate } from './templates/property-rejected.template';
import { UserCreatedEvent } from '@roomate/shared-types';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');
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

  async sendCommunitySubmittedEmail(
    toEmail: string,
    communityName: string,
  ): Promise<void> {
    const mail = {
      to: toEmail,
      from: { name: 'RooMate', email: 'gosavishreya08@gmail.com' },
      subject: `Your community request for "${communityName}" has been received`,
      html: communitySubmittedTemplate(communityName),
    };
    await this.sendWithRetry(mail, 'community-submitted');
  }

  async sendCommunityApprovedEmail(
    toEmail: string,
    communityName: string,
  ): Promise<void> {
    const mail = {
      to: toEmail,
      from: { name: 'RooMate', email: 'gosavishreya08@gmail.com' },
      subject: `Your community "${communityName}" is now live!`,
      html: communityApprovedTemplate(communityName),
    };
    await this.sendWithRetry(mail, 'community-approved');
  }

  async sendCommunityRejectedEmail(
    toEmail: string,
    communityName: string,
  ): Promise<void> {
    const mail = {
      to: toEmail,
      from: { name: 'RooMate', email: 'gosavishreya08@gmail.com' },
      subject: `Update on your community request: ${communityName}`,
      html: communityRejectedTemplate(communityName),
    };
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
        await sgMail.send({
          from: { name: mail.from.name, email: mail.from.email },
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
