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








 

//  model User {
//    id             Int       @id @default(autoincrement())
//    firstName           String
//    secondName           String
//    hashedPassword String
//    email          String    @unique
//    registrationNumber String @unique
//   //  status         UserStatus @default(ACTIVE)
//    userType       UserType
//    createdAt      DateTime @default(now())
//    updatedAt      DateTime @default(now())
//    projects       Project[]
//  }

// model Project {
//   projectId      Int      @id @default(autoincrement())
//   title          String
//   createdAt      DateTime @default(now())
//   ans1           String
//   ans2           String
//   ans3           String
//   ans4           String
//   school         School
//   //  comment        String        @default("")
//   // Payment        Int @default(0)
//   // paymentStatus        PaymentStatus @default(UNPAID)
//   status         ProjectStatus @default(PENDING)
//   userId         Int
//   user           User      @relation(fields: [userId], references: [id])
// }





//  enum UserType {
//    ADMIN
//    STUDENT
//    SUPERADMIN
//  }
//  enum School {
//    SONAS
//    SASS
//  }

//  enum ProjectStatus {
//    PENDING
//    ACCEPTED
//    REJECTED
//  }
//  enum UserStatus {
//    ACTIVE
//    INACTIVE
//  }
//  enum PaymentStatus {
//    PAID
//    UNPAID
//  }
