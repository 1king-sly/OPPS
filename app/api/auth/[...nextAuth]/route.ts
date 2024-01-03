import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';


import{authOptions} from '@/utils/authUptions'

// Define the User type

// Create the authentication handler
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };