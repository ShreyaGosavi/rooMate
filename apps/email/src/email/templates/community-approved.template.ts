export function communityApprovedTemplate(communityName: string, webUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background: #f8fafa; padding: 40px 0;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px;">
    <h1 style="color: #061b32; font-size: 24px;">🎉 Your community is live!</h1>
    <p style="color: #4a5568;">Great news! Your request to create <strong>${communityName}</strong> has been approved.</p>
    <p style="color: #4a5568;">The community is now live on RooMate. Members can start joining and posting.</p>
    <a href="${webUrl}/communities" style="display:inline-block;margin-top:24px;background:#061b32;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">View Community</a>
    <p style="margin-top: 32px; color: #9fdbda; font-size: 13px;">— The RooMate Team</p>
  </div>
</body>
</html>`;
}
