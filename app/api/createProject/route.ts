// app/api/createProject/route.ts
import prisma from '@/app/lib/prismadb';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function POST(request:Request)  {
  const session = await getSession({ req: request });

  if (!session) {
    return new NextResponse(  'Not authenticated' , { status: 401 });
  }


  try {
    const body=await request.json()
    const{
        title,
        ans1,
        ans2,
        ans3,
        ans4
    } = body


    if (!title || !ans1 || !ans2 || !ans3 || !ans4) {
      return new NextResponse('Missing information', { status: 400 });
    }

    // Create the project using Prisma
    const project = await prisma.project.create({
      data: {
        title,
        ans1,
        ans2,
        ans3,
        ans4,
        status: 'PENDING',
        userId: session.user.id, 
      },
    });

    return NextResponse.json(project)
  } catch (error) {
    console.error(error);
    return new NextResponse( 'Internal Server Error' , { status: 500 });
  }
};
