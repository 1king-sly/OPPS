import { createPreuser } from '@/app/lib/actions';
import prisma from '@/app/lib/prismadb';
import { authOptions } from '@/utils/authUptions';
import { ProjectStatus, School, UserType } from '@prisma/client';
import { error } from 'console';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server'


export async function PUT(request:Request) {
    try{
        const formData=await request.json()

        const { status,projectId,comment,updatedBy,email}= formData
        console.log(formData)
        if(!status || status===''){
            throw error ('Status required')
        }

        if(status === 'REFERRED'){
            if(!email || email===''){
                throw error('Email missing')
            }
            const existingUser = await prisma.user.findFirst({
                where: {
                  email:email
                },
              });

              const existingPreuser = await prisma.preuser.findFirst({
                where: {
                  email:email
                },
              });
          
              if (!existingUser && !existingPreuser) {
                const moderator =await createPreuser(email)
              }
            
            const referredProject = await prisma.reference.create({
                data:{
                    email:email,
                    projectId:parseInt(projectId)
                }
            }) 

            if(referredProject){
                revalidatePath('/Admin/Referred')
                revalidatePath('/Admin/Dashboard')
                revalidatePath('/Admin/Projects')

               
            }
            else{
                return new NextResponse('Something went wrong', { status: 400 });            }
          }
    
        const project = await prisma.project.update({
            where: {
                projectId:parseInt(projectId),
                status:ProjectStatus.PENDING,            },
            data: {
                status:ProjectStatus[status as keyof typeof ProjectStatus],
                comment:comment,
                updatedBy:updatedBy,},
          });

          

            revalidatePath('/Admin/Dashboard')
            revalidatePath('/Admin/Projects')
    
            return new NextResponse(JSON.stringify(project), {
                headers: { 'Content-Type': 'application/json' },
              });    
    }
    catch(error:any){
        console.log(error, "UPDATING PROJECT")
        return new NextResponse('Internal Error', {status:500})
    }
    finally{
        revalidatePath('/Admin/Dashboard')
        revalidatePath('/Admin/Projects')
    }
 }