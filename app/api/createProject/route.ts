// Import types from Next.js
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

// Your existing imports...
import prisma from '@/app/lib/prismadb';
import { getSession } from 'next-auth/react';

type Project = {
  projectId: number;
  title: string;
  ans1: string;
  ans2: string;
  ans3: string;
  ans4: string;
  status: string;
  userId: string;
  // Add other properties as needed based on your Prisma schema
};

export async function POST(request: NextApiRequest) {
  const session = await getSession({ req: request });

  if (!session) {
    return new NextResponse('Not authenticated', { status: 401 });
  }

  try {
    const body = await request.body();

    const { title, ans1, ans2, ans3, ans4 } = body;

    if (!title || !ans1 || !ans2 || !ans3 || !ans4) {
      return new NextResponse('Missing information', { status: 400 });
    }

    const userId = session.user?.id;

    if (!userId) {
      return new NextResponse('User ID not found in session', { status: 401 });
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
        userId: userId,
      },
    });
    return  NextResponse.json(project) as unknown as NextResponse<Project>;
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 }) as NextResponse<Project>;
  }
}
