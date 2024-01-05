import NextAuth from "next-auth"

declare module "next-auth" {
  interface User{
    firstName: string,
    secondName: string,
    userType: string,
    registrationNumber: string,
    email:string,
    id:string,
    image:string,
  }
  interface Session {
    user:User 
    firstName: string,
    secondName: string,
    userType: string,
    registrationNumber: string,
    email:string,
    id:string,
    image:string,

    
  }
}


