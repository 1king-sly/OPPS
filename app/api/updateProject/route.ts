import prisma from '@/app/lib/prismadb';
import { authOptions } from '@/utils/authUptions';
import { ProjectStatus, School } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'


export async function PUT(request:Request) {
    try{
        const formData=await request.json()

        const session = await getServerSession(authOptions)

        if(!session){
            return new NextResponse('Unauthorized', {status:401})

        }
        const status = formData.get('status') as string;
        const projectId = formData.get('projectId') as string;
        const comment = formData.get('comment') as string;
        const updatedBy = session?.firstName + "" + session?.secondName
    
        const statusEnum = ProjectStatus[status as keyof typeof ProjectStatus]

        const project = await prisma.project.update({
            where: {
                projectId:parseInt(projectId),
                status:ProjectStatus.PENDING,            },
            data: {
                status:statusEnum,
                comment:comment,
                updatedBy:updatedBy,},
          });

            console.log('New Updated Api Project',project)
    
            return new NextResponse(JSON.stringify(project), {
                headers: { 'Content-Type': 'application/json' },
              });    }
    catch(error:any){
        console.log(error, "UPDATING PROJECT")
        return new NextResponse('Internal Error', {status:500})
    }
 }