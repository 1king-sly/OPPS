import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/lib/prismadb';
import { UserType } from '@prisma/client';
import { useState } from 'react';

// Define the User type
type User = {
  id: string;
  firstName: string;
  secondName: string;
  hashedPassword: string;
  email: string;
  registrationNumber: string;
  userType: UserType;
  createdAt: Date;
};

// Define authentication options
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials: Record<'email' | 'password', string> | undefined): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
      
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            firstName: true,
            secondName: true,
            userType: true,
            hashedPassword: true,
            registrationNumber: true,
            createdAt: true,
            email: true,
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
        const userWithIdAsString: User = {
          ...user,
          id: user.id.toString(),
        };
      
        return {
          id: `${user.id}`,
          firstName :user.firstName,
          secondName :user.secondName,
          email :user.email,
          registrationNumber: user.registrationNumber,
          userType: user.userType,
          createdAt: user.createdAt,
          hashedPassword: user.hashedPassword,

          
          
        };
      },
    }),
  ],
  callbacks:{

   async jwt({ token, account, profile,user }) {
    // Persist the OAuth access_token and or the user id to the token right after signin
    if (user) {
      return{
        ...token,
        firstName: user.firstName,
        secondName:user.secondName,
        email: user.email,
        userType:user.userType,
        registrationNumber:user.registrationNumber,
      }
    }
    


    return token
  },
    
  async session({ session, user, token }) {

    

    console.log("Token Data", token.secondName)

    console.log('Session', session)
    return{
      ...session,
      firstName:token.firstName,
      secondName:token.secondName,
      email:token.email,
      userType:token.userType,
      registrationNumber:token.registrationNumber,

    }
    },
  
},

  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export authentication options
export default authOptions;