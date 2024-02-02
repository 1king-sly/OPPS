import { createPreuser } from '@/app/lib/actions';
import prisma from '@/app/lib/prismadb';
import { authOptions } from '@/utils/authUptions';
import { ProjectStatus } from '@prisma/client';
import { error } from 'console';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server'


export async function PUT(request:Request) {
    try{
        const formData=await request.json()

        const { status,projectId,moderatorComment,moderatedBy}= formData
        if(!status || status===''){
            throw error ('Status required')
        }

        const user = await getServerSession(authOptions)
    
        const project = await prisma.project.update({
            where: {
                projectId:parseInt(projectId),
                status:ProjectStatus.REFERRED,            },
            data: {
                status:ProjectStatus[status as keyof typeof ProjectStatus],
                moderatorComment:moderatorComment,
                moderatorName:moderatedBy,},
          });
          if(project){
            const deleteProject =  await prisma.reference.delete({
                where: {
                  email_projectId: {
                    email: user?.email,
                    projectId: parseInt(projectId),
                  },
                },
              });
          }

          
          revalidatePath(`/Moderator/Projects/${projectId}`)
            revalidatePath('/Moderator/Dashboard')
            revalidatePath('/Moderator/Projects')
    
            return new NextResponse(JSON.stringify(project), {
                headers: { 'Content-Type': 'application/json' },
              });    
    }
    catch(error:any){
        console.log(error, "UPDATING PROJECT")
        return new NextResponse('Internal Error', {status:500})
    }
    finally{
        revalidatePath('/Moderator/Dashboard')
        revalidatePath('/Moderator/Projects')

    }
 }