export function communityRejectedTemplate(communityName: string): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background: #f8fafa; padding: 40px 0;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px;">
    <h1 style="color: #061b32; font-size: 24px;">Community Request Update</h1>
    <p style="color: #4a5568;">Unfortunately, your request to create <strong>${communityName}</strong> was not approved at this time.</p>
    <p style="color: #4a5568;">You can submit a new request with updated details if you'd like to try again.</p>
    <a href="http://localhost:3000/communities" style="display:inline-block;margin-top:24px;background:#061b32;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">Browse Communities</a>
    <p style="margin-top: 32px; color: #9fdbda; font-size: 13px;">— The RooMate Team</p>
  </div>
</body>
</html>`;
}
