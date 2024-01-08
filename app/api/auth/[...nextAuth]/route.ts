import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';


import{authOptions} from '@/utils/authUptions'

// 
const handler = NextAuth();

export { handler as GET, handler as POST };