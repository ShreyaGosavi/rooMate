export function propertyRejectedTemplate(ownerEmail: string): {
  to: string;
  from: { name: string; email: string };
  subject: string;
  html: string;
} {
  return {
    to: ownerEmail,
    from: { name: 'RooMate', email: 'gosavishreya08@gmail.com' },
    subject: 'Update on your property listing',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Listing not approved</h2>
        <p>Unfortunately, your property listing could not be approved at this time.</p>
        <p>This may be due to incomplete information or documentation that couldn't be verified.</p>
        <p>Please review your listing details and resubmit with accurate information and valid ownership proof.</p>
        <p>If you have any questions, please contact our support team.</p>
        <br/>
        <p>— The RooMate Team</p>
      </div>
    `,
  };
}
