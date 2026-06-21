export function communityRequestConfirmationTemplate(userEmail: string, communityName: string): {
  to: string;
  from: { name: string; email: string };
  subject: string;
  html: string;
} {
  return {
    to: userEmail,
    from: { name: 'RooMate', email: 'noreply@roomate.in' },
    subject: `We received your request for "${communityName}"`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Community Request Received!</h2>
        <p>Thanks for requesting <strong>${communityName}</strong> on RooMate.</p>
        <p>Our team will review your request within <strong>24 hours</strong>.</p>
        <p>We'll notify you once it's approved or if we need more information.</p>
        <br/>
        <p>— The RooMate Team</p>
      </div>
    `,
  };
}
