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
      title,
      ans1,
      ans2,
      ans3,
      ans4,
      schoolFromFormData,
    } = body;

    if (!title || !ans1 || !ans2 || !ans3 || !ans4) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const session = await getServerSession(authOptions);


    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = parseInt(session?.id);


    const newProject = await prisma.project.create({
      data: {
        title,
        ans1,
        ans2,
        ans3,
        ans4,
        userId,
        school: School[schoolFromFormData as keyof typeof School],
      },
    });

    


     revalidatePath('/User/Dashboard');


    return new NextResponse(JSON.stringify(newProject), {
      headers: { 'Content-Type': 'application/json' },
    });


  } catch (error: any) {
    console.log(error, 'CREATING PROJECT');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
