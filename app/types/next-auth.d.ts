import NextAuth from "next-auth"

declare module "next-auth" {
  interface User{
    firstName: string,
    secondName: string,
    userType: string,
    registrationNumber: string,
    email:string,
    id:string,
  }
  interface Session {
    user:User 
    firstName: string,
    secondName: string,
    userType: string,
    registrationNumber: string,
    email:string,
    id:string,

    
  }

  interface ProjectFormData{
    schoolFromFormData:string,
    title:string,
    email:string,
    ans1:string,
    ans2:string, 
    ans3: string,
    ans4:string,
  }
}

