export const verificationTemplate = (email: string, token: string) => ({
  to: email,
  from: {
    name: 'RooMate',
    email: 'gosavishreya08@gmail.com',
  },
  subject: 'Verify your RooMate email',
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #061b32;">Verify your email</h2>
      <p>Click the link below to verify your email address:</p>
      <a href="http://localhost:3007/api/auth/verify-email?token=${token}" 
         style="display:inline-block;background:#061b32;color:#9fdbda;padding:12px 24px;text-decoration:none;font-weight:600;">
        Verify Email
      </a>
      <p style="color:#666;font-size:13px;">This link expires in 15 minutes.</p>
      <p style="color:#666;font-size:13px;">If you did not request this, ignore this email.</p>
    </div>
  `,
});
