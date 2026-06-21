export function communityRequestedTemplate(adminEmail: string, communityName: string, city: string, requestedByEmail: string): {
  to: string;
  from: { name: string; email: string };
  subject: string;
  html: string;
} {
  return {
    to: adminEmail,
    from: { name: 'RooMate', email: 'noreply@roomate.in' },
    subject: `New community request: ${communityName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Community Request</h2>
        <p>A user has requested a new community on RooMate.</p>
        <p><strong>Community:</strong> ${communityName}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Requested by:</strong> ${requestedByEmail}</p>
        <p>Please review and approve or reject this request in the admin panel.</p>
        <br/>
        <p>— The RooMate System</p>
      </div>
    `,
  };
}
