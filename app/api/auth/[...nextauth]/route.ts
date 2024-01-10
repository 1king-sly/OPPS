import bcrypt from 'bcrypt';
import NextAuth, { SessionStrategy } from 'next-auth';


import { authOptions } from '@/utils/authUptions';
// Ensure authOptions.secret is defined or provide a default value
const secret = authOptions.secret || 'default-secret';

// If secret is still a string, create an object with 'secret' property
const options = typeof secret === 'string' ? { ...authOptions, secret } : authOptions;

// Make sure session.strategy is of type SessionStrategy | undefined
// options.session = {
//   ...(options.session || {}),
//   strategy: 'jwt' as SessionStrategy,
// };

const handler = NextAuth(options);

export { handler as GET, handler as POST };
