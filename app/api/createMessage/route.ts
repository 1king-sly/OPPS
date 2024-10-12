import prisma from '@/app/lib/prismadb';
import { authOptions } from '@/utils/authUptions';
import { School } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      receiverId,
      text,
    
    } = body;

    if ( !receiverId || !text) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const session = await getServerSession(authOptions);


    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const senderId = parseInt(session.id);


    const newText = await prisma.message.create({
      data: {
        senderId:senderId,
        receiverId:parseInt(receiverId),
        content:text,
      },
    });

     


    return NextResponse.json(newText)



  } catch (error: any) {
    console.log(error, 'CREATING PROJECT');
    return new NextResponse('Internal Error', { status: 500 });
  }

}
