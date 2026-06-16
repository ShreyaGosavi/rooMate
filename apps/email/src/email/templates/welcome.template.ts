export const welcomeTemplate = (name: string) => ({
  to: '',
  from: {
    name: 'RooMate',
    email: 'onboarding@resend.dev',
  },
  subject: 'Welcome to RooMate!',
  html: `
    <h2>Hey ${name}, welcome to RooMate!</h2>
    <p>We're glad you're here. Start exploring listings, join communities, and find your perfect room.</p>
    <p>If you have any questions, just reply to this email.</p>
    <br />
    <p>— The RooMate Team</p>
  `,
});
