import prisma from '@/app/lib/prismadb';
import { authOptions } from '@/utils/authUptions';
import { School } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET() {
  try {

  


    const user = await getServerSession(authOptions);




    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (user.userType === 'ADMIN' || user.UserType === 'SUPERADMIN') {
        const messageCount = await prisma.message.count({
          where: {
            OR: [
              { senderId: parseInt(user.id) },
              { receiverId:parseInt( user.id) },
            ],
          },
        });
    
        if (messageCount === 0) {
          return await prisma.user.findMany({
            where: {
              id: {
                not:parseInt( user.id), 
              },
            },
            orderBy:{
              lastActiveAt:'desc'
            }
          });
        }
        const contacts = await prisma.user.findMany({
          where: {
            OR: [
              {
                sentMessages: {
                  some: { receiverId: parseInt( user.id) },
                },
              },
              {
                receivedMessages: {
                  some: { senderId: parseInt( user.id) },
                },
              },
            ],
          },
          include: {
            sentMessages: {
              orderBy: {
                createdAt: 'desc', 
              },
              take: 1, 
            },
            receivedMessages: {
              orderBy: {
                createdAt: 'desc', 
              },
              take: 1, 
            },
          },
        });
    
        
        const sortedContacts = contacts.sort((a, b) => {
          const latestA = a.sentMessages[0]?.createdAt || a.receivedMessages[0]?.createdAt;
          const latestB = b.sentMessages[0]?.createdAt || b.receivedMessages[0]?.createdAt;
    
          return new Date(latestB).getTime() - new Date(latestA).getTime(); 
        });
    
        return NextResponse.json(sortedContacts); 
    }

  } catch (error: any) {
    console.error('Error: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }

}
