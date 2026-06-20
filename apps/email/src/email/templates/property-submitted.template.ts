export function propertySubmittedTemplate(ownerEmail: string): {
  to: string;
  from: { name: string; email: string };
  subject: string;
  html: string;
} {
  return {
    to: ownerEmail,
    from: { name: 'RooMate', email: 'noreply@roomate.in' },
    subject: 'Your property listing has been received!',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thanks for listing your property!</h2>
        <p>We've received your property listing and our team will verify it within <strong>24 hours</strong>.</p>
        <p>Once verified, your listing will go live and be visible to potential tenants.</p>
        <p>We'll notify you as soon as the review is complete.</p>
        <br/>
        <p>— The RooMate Team</p>
      </div>
    `,
  };
}
