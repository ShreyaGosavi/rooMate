export function communityApprovedTemplate(ownerEmail: string, communityName: string): {
  to: string;
  from: { name: string; email: string };
  subject: string;
  html: string;
} {
  return {
    to: ownerEmail,
    from: { name: 'RooMate', email: 'noreply@roomate.in' },
    subject: `Your community "${communityName}" is now live! 🎉`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Your Community is Live!</h2>
        <p>Great news! Your request for <strong>${communityName}</strong> has been approved.</p>
        <p>The community is now live on RooMate. Share it with your college or office mates!</p>
        <br/>
        <p>— The RooMate Team</p>
      </div>
    `,
  };
}
