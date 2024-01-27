import { NextApiRequest } from 'next';
import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request: NextApiRequest) {
  try {
    const { projectId } = request.query as { projectId: string };

    if (!projectId) {
      return new NextResponse('Missing projectId in query parameters', {
        status: 400,
      });
    }

    const project = await prisma.project.findUnique({
      where: {
        projectId: parseInt(projectId, 10),
      },
      select: {
        projectId: true,
        title: true,
        ans1: true,
        ans2: true,
        ans3: true,
        ans4: true,
        status: true,
        school: true,
        userId: true,
        updatedBy: true,
        comment: true,
      },
    });

    if (!project) {
      return new NextResponse('Project not found', { status: 404 });
    }

    return new NextResponse(JSON.stringify(project), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.log(error, 'FETCHING PROJECT');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
