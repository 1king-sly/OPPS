import NextAuth from 'next-auth';
import authOptions from './authUptions';

const authHandler = NextAuth(authOptions);

// Export the handler function for GET and POST requests
export   { authHandler as POST, authHandler as GET };
