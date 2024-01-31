import prisma from '@/app/lib/prismadb';
import { authOptions } from '@/utils/authUptions';
import { ProjectStatus, School } from '@prisma/client';
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
            const referredProject = await prisma.reference.create({
                data:{
                    email:email,
                    projectId:parseInt(projectId)
                }
            }) 

            if(referredProject){
                console.log('Referred Project created successfully', referredProject)
                revalidatePath('/Admin/Referred')
                revalidatePath('/Admin/Dashboard')
                revalidatePath('/Admin/Projects')
            }
            else{
                throw  error('something went wrong')
            }
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

          
            console.log('New Updated Api Project',project)

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
 }