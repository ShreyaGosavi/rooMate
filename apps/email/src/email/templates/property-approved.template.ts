export function propertyApprovedTemplate(ownerEmail: string): {
  to: string;
  from: { name: string; email: string };
  subject: string;
  html: string;
} {
  return {
    to: ownerEmail,
    from: { name: 'RooMate', email: 'noreply@roomate.in' },
    subject: 'Your property listing is now live! 🎉',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Your listing is live!</h2>
        <p>Great news! Your property has been <strong>verified and approved</strong> by our team.</p>
        <p>It's now visible to potential tenants on RooMate.</p>
        <p>You'll be notified when someone shows interest in your property.</p>
        <br/>
        <p>— The RooMate Team</p>
      </div>
    `,
  };
}
