import bcrypt from 'bcrypt'
import prisma from "@/app/lib/prismadb"
import { NextResponse
 } from 'next/server'
 import { UserType } from '@prisma/client'
 export async function POST(request:Request) {
    try{
        const body=await request.json()
        const{
            email,
            firstName,
            secondName,
            password,
            registrationNumber
        } = body


        if(!email || !firstName || !secondName || !password){
            return new NextResponse('Missing info', {status:400})
        }

        const hashedPassword = await bcrypt.hash(password,12)

        const user = await prisma.user.create({
            data: {
                email,
                firstName,
                secondName,
                hashedPassword,
                registrationNumber,
                userType: UserType.STUDENT             },
        });
        

        return NextResponse.json(user)
    }
    catch(error:any){
        console.log(error, "REGISTRATION")
        return new NextResponse('Internal Error', {status:500})
    }
 }