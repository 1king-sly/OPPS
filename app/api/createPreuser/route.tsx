import prisma from '@/app/lib/prismadb';
import { UserType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  'use server'
  try {
    const body = await request.json();
    let {
      firstName,
      secondName,
      password,
      registrationNumber,
      email,
      userType,
    } = body;
    if(email && !firstName && !secondName && !password && !registrationNumber && !userType){
      firstName='New'
      secondName='User'
      password=email
      registrationNumber=email
      email=email
      userType='MODERATOR'
    }

    if (!firstName || !secondName || !password || !email || !userType) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

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

    if (existingUser) {
      console.log('User Existing: ',existingUser)

      return new NextResponse('User with credentials already exists', { status: 400 });

    }

    const newPreuser = await prisma.preuser.create({
      data: {
        firstName: firstName,
        secondName: secondName,
        hashedPassword: hashedPassword,
        email: email,
        userType: UserType[userType as keyof typeof UserType],
        registrationNumber: registrationNumber,
      },
    });

    revalidatePath('/SuperAdmin/Users');

    return new NextResponse(JSON.stringify(newPreuser), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error(error, 'CREATING PRE-USER');
    return new NextResponse('Internal Error', { status: 500 });
  } finally {
    revalidatePath('/SuperAdmin/Users');
  }
}
