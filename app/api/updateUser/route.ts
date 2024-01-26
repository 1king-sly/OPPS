import prisma from '@/app/lib/prismadb';
import { authOptions } from '@/utils/authUptions';
import { School } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'


export async function PUT(request:Request) {
    try{
        const formData=await request.json()

        const userId = formData.get('userId') as string;
        const school = formData.get('school') as  string;
      
      
        const email = formData.get('email') as string | null;
        const userType = formData.get('userType') as string | null;
        const registrationNumber = formData.get('registrationNumber') as string | null;
        const password = formData.get('password') as string | null;


        const data: Record<string, string> = {};

    
        if (email !== null && email !== '') {
          data.email = email;
        }
        if (school !== null && school !== '') {
          data.school = School[school as keyof typeof School];
    
        }
        if (registrationNumber !== null && registrationNumber !== '') {
          data.registrationNumber = registrationNumber;
        }
    
        if (userType !== null && userType !== '') {
          data.userType = userType;
        }
    
        if (password !== null && password !== '') {
          data.hashedPassword = await bcrypt.hash(password, 12);
        }

        

        const session = await getServerSession(authOptions)

        if(!session){
            return new NextResponse('Unauthorized', {status:401})

        }

        const updatedUser = await prisma.user.update({
            where: {
              id: parseInt(userId),
            },
            data: data,
          });

            console.log('New Updated Api User',updatedUser)
            revalidatePath(`/SuperAdmin/Users/${userId}`);
    
            return new NextResponse(JSON.stringify(updatedUser), {
                headers: { 'Content-Type': 'application/json' },
              });    }
    catch(error:any){
        console.log(error, "UPDATING USER")
        return new NextResponse('Internal Error', {status:500})
    }
 }