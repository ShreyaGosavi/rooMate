export function communitySubmittedTemplate(communityName: string): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background: #f8fafa; padding: 40px 0;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px;">
    <h1 style="color: #061b32; font-size: 24px;">Community request received!</h1>
    <p style="color: #4a5568;">Thanks for requesting <strong>${communityName}</strong> on RooMate.</p>
    <p style="color: #4a5568;">Our team will review your request and get back to you within 24 hours.</p>
    <p style="margin-top: 32px; color: #9fdbda; font-size: 13px;">— The RooMate Team</p>
  </div>
</body>
</html>`;
}
