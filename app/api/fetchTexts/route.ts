import prisma from '@/app/lib/prismadb';
import { authOptions } from '@/utils/authUptions';
import { School } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);
    const receiverId = searchParams.get('receiverId');

    if(!receiverId){
        return new NextResponse('Missing info', { status: 400 });
    }


    const session = await getServerSession(authOptions);




    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user1Id = parseInt(session.id);

  const chats = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: parseInt(receiverId),
            receiverId: user1Id,
          },
          {
            senderId: user1Id,
            receiverId: parseInt(receiverId),
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id:true,
        content: true,
        senderId: true,
        receiverId: true,
        createdAt: true,
      },
    });

    if (chats.length === 0) {
      console.log('No chats found between these users.');
      return []; 
    }
    return NextResponse.json(chats); 

   

     





  } catch (error: any) {
    console.error('Error: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }

}
