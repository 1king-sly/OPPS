// use server
import prisma from '@/app/lib/prismadb';
import { UserType } from '@prisma/client';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const formData = await request.json();


    const { status, email, registrationNumber, firstName, secondName, hashedPassword, userType } = formData;


    if (!status || status === '' || !email || !registrationNumber) {
      console.log('Missing info');
      return new NextResponse('Missing info', { status: 400 });
    }

    if (status === 'APPROVE') {
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


      if (newUser) {
        const deletedUser = await prisma.preuser.delete({
          where: {
            email: email,
          },
        });


        if (deletedUser) {
          revalidatePath('/SuperAdmin/Users');
          revalidatePath('/SuperAdmin/Pending');

          return new NextResponse(JSON.stringify(formData), {
            headers: { 'Content-Type': 'application/json' },
          });
        } else {
          return new NextResponse('Error deleting preuser', { status: 500 });
        }
      } else {
        return new NextResponse('Error creating user', { status: 500 });
      }
    } else {
      const deletedUser = await prisma.preuser.delete({
        where: {
          email: email,
        },
      });


      if (deletedUser) {
        revalidatePath('/SuperAdmin/Users');
        revalidatePath('/SuperAdmin/Pending');

        return new NextResponse(JSON.stringify(formData), {
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new NextResponse('Error deleting preuser', { status: 500 });
      }
    }
  } catch (error: any) {
    console.error(error, 'VALIDATING USER ');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
