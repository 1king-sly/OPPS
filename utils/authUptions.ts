import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/lib/prismadb';
import { UserType } from '@prisma/client';

type User = {
  id: string;
  firstName: string;
  secondName: string;
  hashedPassword: string;
  email: string;
  registrationNumber: string;
  userType: UserType;
  createdAt: Date;
  updatedAt:Date;
  // status:UserStatus;
};

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
            updatedAt: true,
            email: true,
            // status:true,
          },
        });
      
        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials');
        }
        
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
         
        if (!isCorrectPassword) {
          throw new Error('Password Invalid');
        }
      
       
      
        return {
          id: `${user.id}`,
          firstName :user.firstName,
          secondName :user.secondName,
          email :user.email,
          registrationNumber: user.registrationNumber,
          userType: user.userType,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          hashedPassword: user.hashedPassword,
          // status: user.status

          
          
        };
      },
    }),
  ],
  callbacks:{

   async jwt({ token, user }: { token: any; user: any })  {
    
    if (user) {
      return{
        ...token,
        id:user.id,
        firstName: user.firstName,
        secondName:user.secondName,
        email: user.email,
        userType:user.userType,
        registrationNumber:user.registrationNumber,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt,
        // status:user.status
      }
    }
    


    return token
  },
    
  async session({ session, token }: { session: any; token: any }) {

    


    return{
      ...session,
      id:token.sub,
      firstName:token.firstName,
      secondName:token.secondName,
      email:token.email,
      userType:token.userType,
      registrationNumber:token.registrationNumber,
      createdAt:token.createdAt,
      updatedAt:token.updatedAt,
       // status:user.status


    }
    },
  
},

  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;