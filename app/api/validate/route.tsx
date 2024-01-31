import { fetchPreusers } from '@/app/lib/actions';
import prisma from '@/app/lib/prismadb';
import { UserType } from '@prisma/client';
import { error } from 'console';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server'


export async function POST(request:Request) {
  'use server'
    try{
        const formData=await request.json()

        const { status,email,registrationNumber,firstName,secondName,hashedPassword,userType}= formData
        console.log(formData)
        if(!status || status==='' || !email || !registrationNumber){
            throw error ('Missing values')
        }

        if(status === 'APPROVE'){
            
            const existingUser = await prisma.user.findFirst({
                where: {
                  OR: [
                    {
                      email: email,
                    },
                    {
                      registrationNumber: registrationNumber,
                    },
                  ],
                },
              });

            if(existingUser){
                return new NextResponse('User with credentials already exists', { status: 400 });
            }

            const newUser = await prisma.user.create({
                data: {
                  firstName: firstName,
                  secondName: secondName,
                  hashedPassword: hashedPassword,
                  email: email,
                  userType: UserType[userType as keyof typeof UserType],
                  registrationNumber: registrationNumber,
                },
              });


              if(newUser){
                const deletedUser = await prisma.preuser.delete({
                    where:{
                        email:email
                    }
                })


              }
           
          }

          else{
            
                const deletedUser = await prisma.preuser.delete({
                    where:{
                        email:email
                    }
                })

                    }
            revalidatePath('/SuperAdmin/Users')
            revalidatePath('/SuperAdmin/Pending')
    
            return new NextResponse('User validated');    
    }
    catch(error:any){
        console.log(error, "VALIDATING USER ")
        return new NextResponse('Internal Error', {status:500})
    }finally{
      
      revalidatePath('/SuperAdmin/Pending')
      revalidatePath('/SuperAdmin/Users')

    }
 }