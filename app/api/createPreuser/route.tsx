import prisma from '@/app/lib/prismadb';
import { UserType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const nodemailer = require('nodemailer');

export async function POST(request: Request) {
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

    if (email && !firstName && !secondName && !password && !registrationNumber && !userType) {
      firstName = 'New';
      secondName = 'User';
      password = email;
      registrationNumber = email;
      userType = 'MODERATOR';
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
      return new NextResponse('User with credentials already exists', { status: 402 });
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

    if(newPreuser){

      const transporter:any = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false,
      },
        secure: false, 
        auth: {
          user: process.env.NEXT_PUBLIC_PERSONAL_EMAIL,
          pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: {
          name:'Byrone Kinsly',
          address:process.env.NEXT_PUBLIC_PERSONAL_EMAIL
        }, 
        to: email, 
        subject: "Online Project Proposal System Request", 
        text:` Hello ${firstName}, your request has been recieved successfully and is being reviewed`,
        html: `<b> Hello ${firstName}, your request has been recieved successfully and is being reviewed</b>`, 
      });
    
      console.log("Message sent: %s", info.messageId);
     
    }

    revalidatePath('/SuperAdmin/Pending');

    return new NextResponse(JSON.stringify(newPreuser), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error(error, 'CREATING PRE-USER');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
