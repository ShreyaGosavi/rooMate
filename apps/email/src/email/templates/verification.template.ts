export const verificationTemplate = (email: string, token: string) => ({
  to: email,
  from: {
    name: 'RooMate',
    email: 'onboarding@resend.dev',
  },
  subject: 'Verify your RooMate email',
  html: `
    <h2>Verify your email</h2>
    <p>Click the link below to verify your email address:</p>
    <a href="http://localhost:3001/api/auth/verify-email?token=${token}">
      Verify Email
    </a>
    <p>This link expires in 15 minutes.</p>
    <p>If you did not request this, ignore this email.</p>
    <br />
    <p>— The RooMate Team</p>
  `,
});
