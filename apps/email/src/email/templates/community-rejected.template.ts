export function communityRejectedTemplate(ownerEmail: string, communityName: string): {
  to: string;
  from: { name: string; email: string };
  subject: string;
  html: string;
} {
  return {
    to: ownerEmail,
    from: { name: 'RooMate', email: 'noreply@roomate.in' },
    subject: `Update on your community request: ${communityName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Community Request Not Approved</h2>
        <p>Unfortunately, your request for <strong>${communityName}</strong> could not be approved at this time.</p>
        <p>This may be because a similar community already exists or the details provided could not be verified.</p>
        <p>If you have questions, please contact our support team.</p>
        <br/>
        <p>— The RooMate Team</p>
      </div>
    `,
  };
}
