import bcrypt from 'bcrypt';
import NextAuth, {  Awaitable, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/lib/prismadb';
import client from '@/app/lib/prismadb';


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(client),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials){
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
      
        const user = await client.user.findUnique({
          where: {
            email: credentials.email,
          },
         
        });
      
        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials');
        }
        
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
         
        if (!isCorrectPassword) {
          throw new Error('Password Invalid');
        }
      
        // Ensure that the 'id' property is a string
        
      
        return {
          id: user.id,
          firstName :user.firstName,
          secondName :user.secondName,
          email :user.email,
          registrationNumber: user.registrationNumber,
          userType: user.userType,
          createdAt: user.createdAt,
          
        };
      },
    }),
  ],
  callbacks:{
    async jwt ({token,user,account,profile,isNewUser,trigger,session}):Awaitable<jwt>{
      if(account){
        return{
          ...token,
          firstName:user.firstName
        }
      }
    },
    async session({session,user,token}){
      return{
        ...session,
        user:{
          ...session.user,
          firstName: token.firstName
        }
      }
    }
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export authentication options
export default authOptions;
