export const passwordResetTemplate = (resetUrl: string) => ({
  to: '',
  from: {
    name: 'RooMate',
    email: 'gosavishreya08@gmail.com',
  },
  subject: 'Reset your RooMate password',
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
      <h2 style="color: #061b32;">Reset your password</h2>
      <p style="color: #666;">You requested a password reset. Click the button below to set a new password. This link expires in 15 minutes.</p>
      <a href="${resetUrl}" style="display: inline-block; margin: 24px 0; background: #9fdbda; color: #061b32; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px;">
        Reset Password
      </a>
      <p style="color: #999; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
      <p style="color: #999; font-size: 12px;">— The RooMate Team</p>
    </div>
  `,
});
