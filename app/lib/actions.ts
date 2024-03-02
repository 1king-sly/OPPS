'use server';
import {  ProjectStatus, School, UserType } from "@prisma/client";
import prisma from '@/app/lib/prismadb';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt'
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authUptions";

const cron = require('node-cron');

const nodemailer = require('nodemailer');


export const addProject = async (formData: any) => {
  try {
    const schoolFromFormData = formData.schoolFromFormData
    const title = formData.title;
    const ans1 = formData.ans1;
    const ans2 = formData.ans2;
    const ans3 = formData.ans3;
    const ans4 = formData.ans4;

    
    if (!title || !ans1 || !ans2 || !ans3 || !ans4) {
      throw new Error('Required field is missing'); 
    }

    const schoolEnum = School[schoolFromFormData as keyof typeof School];

    const user = await getServerSession(authOptions)

    if (user) {
      const userId = parseInt(user.id);
      const newProject = await prisma.project.create({
        data: {
          title,
          ans1,
          ans2,
          ans3,
          ans4,
          userId,
          school: schoolEnum,
        },
      });
      revalidatePath('/User/Dashboard');

      return newProject
  
    }
  } catch (error) {
    console.error(error, 'Failed to create project');
    
  } finally {
    
    revalidatePath('/User/Dashboard');
  }
};

export const convertDraftToProject = async (formData: any) => {
  try {
    const id =parseInt(formData.id)
    const schoolFromFormData = formData.schoolFromFormData
    const title = formData.title;
    const ans1 = formData.ans1;
    const ans2 = formData.ans2;
    const ans3 = formData.ans3;
    const ans4 = formData.ans4;

    
    if (!title || !ans1 || !ans2 || !ans3 || !ans4 || !id) {
      throw new Error('Required field is missing'); 
    }

    const schoolEnum = School[schoolFromFormData as keyof typeof School];

    const user = await getServerSession(authOptions)

    if (user) {
      const userId = parseInt(user.id);
 
      const newProject = await prisma.project.create({
        data: {
          title,
          ans1,
          ans2,
          ans3,
          ans4,
          userId,
          school: schoolEnum,
        },
      });

      if(newProject){
        const draft = await prisma.draft.delete({
          where:{
            projectId:id
          }
        })
      }
      revalidatePath('/User/Dashboard');

      return newProject
  
    }
  } catch (error) {
    console.error(error, 'Failed to create project');
    
  } finally {
    
    revalidatePath('/User/Dashboard');
  }
};

export const addDraft = async (formData: any) => {

  try {
   
    const title = formData.title;
    const school = formData.schoolFromFormData;
    const ans1 = formData.ans1;
    const ans2 = formData.ans2;
    const ans3 = formData.ans3;
    const ans4 = formData.ans4;

    
    if (!title || !school) {
      throw new Error('Required field is missing'); 
    }

    const schoolEnum = School[school as keyof typeof School];

    const user = await getServerSession(authOptions)

    if (user) {
      const userId = parseInt(user.id);
      const newDraft = await prisma.draft.create({
        data: {
          title,
          ans1,
          ans2,
          ans3,
          ans4,
          userId,
          school: schoolEnum,
        },
      });
      revalidatePath('/User/Dashboard');
      revalidatePath('/User/Drafts');

      return newDraft
  
    }
  } catch (error) {
    console.error(error, 'Failed to draft project');
    
  } 
};


export const fetchUserDashboardProjects = async (userId:number | undefined) => {
  'use server';


  try{

      const projects = await prisma.project.findMany(
       {
        where: {
          userId: parseInt(userId as unknown as string),
          status: {
            in: [ProjectStatus.PENDING, ProjectStatus.REFERRED],
          },
        },
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
       }
      )
      return projects
    

  }catch(error){
    console.error("Error fetching Dashboard User Projects",error)
  }

  
};

export const fetchUserProjects = async (userId:number | undefined, query: string) => {
  'use server';


  try{
    if  (typeof query === 'string' && query.trim() !== '') {
      const projects = await prisma.project.findMany({
        where: {
          userId:parseInt(userId as unknown as string),
          title: {
            contains: query.trim(),
          },
        },
      });
      return projects;
    }
      const projects = await prisma.project.findMany(
       {
        where: {
          userId:parseInt(userId as unknown as string),
        },
       }
      )
      return projects
    

  }catch(error){
    console.error("Error fetching All User Projects",error)
  }

  
};
export const fetchUserDrafts = async (userId:number | undefined, query: string) => {
  'use server';


  try{
    if  (typeof query === 'string' && query.trim() !== '') {
      const projects = await prisma.draft.findMany({
        where: {
          userId:parseInt(userId as unknown as string),
          title: {
            contains: query.trim(),
          },
        },
        orderBy:{
          createdAt:'desc'
        }
      });
      return projects;
    }
      const projects = await prisma.draft.findMany(
       {
        where: {
          userId:parseInt(userId as unknown as string),
        },
        orderBy:{
          createdAt:'desc'
        }
       }
      )
      return projects
    

  }catch(error){
    console.error("Error fetching All User Draft Projects",error)
  }

  
};

export const fetchAllAdminProjects = async (query:string) => {
  'use server';

    const user = await getServerSession(authOptions)

    const dept = user?.school


  try{

    if  (typeof query === 'string' && query.trim() !== '') {
      const projects = await prisma.project.findMany({
        where: {
          title: {
            contains: query.trim(),
          },
          school:School[dept as keyof typeof School]
        },
      });
      return projects;
    }

    const projects = await prisma.project.findMany(
      {
        where:{
          school:School[dept as keyof typeof School]
        }
      }
    )
      return projects
    

  }catch(error){
    console.error("Error fetching All Projects",error)
  }

  
};
export const fetchAllGuestProjects = async (query:string) => {
  'use server';


  try{

    if  (typeof query === 'string' && query.trim() !== '') {
      const projects = await prisma.project.findMany({
        where: {
          title: {
            contains: query.trim(),
          },
          status:{
            in:[ProjectStatus.PENDING,ProjectStatus.ACCEPTED,ProjectStatus.REJECTED]
          }
        },
      });
      return projects;
    }

    const projects = await prisma.project.findMany(
      {where:{
        status:{
          in:[ProjectStatus.PENDING,ProjectStatus.ACCEPTED,ProjectStatus.REJECTED]
        }
      }}
    )
      return projects
    

  }catch(error){
    console.error("Error fetching All Projects",error)
  }

  
};


export const fetchAllAdminReviewedProjects = async ( query: string) => {
  'use server';

  const user = await getServerSession(authOptions)

    const dept = user?.school
    


  try {
    if  (typeof query === 'string' && query.trim() !== '') {
      const projects = await prisma.project.findMany({
        where: {
          status: {
            in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED],
          }
          ,
          title: {
            contains: query.trim(),
          },
          school:School[dept as keyof typeof School]


        },
      });
      return projects;
    }

    const projects = await prisma.project.findMany({
      where: {
        status: {
          in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED],
        },
        school:School[dept as keyof typeof School]
      },
    });
    return projects;
  } catch (error) {
    console.error('Error fetching Reviewed Projects', error);
  }
};

export const countAllProjects = async () => {
  'use server';

  const user = await getServerSession(authOptions)

  const dept = user?.school
  try{
    
    const projects = await prisma.project.count({
      where:{
        status: {
          in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED, ProjectStatus.PENDING],
        },
        school:School[dept as keyof typeof School]
        }
      })
      return projects
    

  }catch(error){
    console.error("Error fetching All Count Projects",error)
  }

  
};
export const countReviewedProjects = async () => {
  'use server';

  const user = await getServerSession(authOptions)

  const dept = user?.school
  
  
  try{
    
    
    const projects = await prisma.project.count({
      where:{
        status: {
          in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED],
        },
        school:School[dept as keyof typeof School]
        }
      })
      return projects
   

  }catch(error){
    console.error("Error fetching All Reviewed Projects",error)
  }

  
};
export const countPendingProjects = async () => {
  'use server';

  const user = await getServerSession(authOptions)

  const dept = user?.school
  
  
  try{
    
    
    const projects = await prisma.project.count({
      where:{
        status: {
          in: [ProjectStatus.PENDING],
        },
        school:School[dept as keyof typeof School]
        }
      })
      return projects
   

  }catch(error){
    console.error("Error fetching All Pending Projects",error)
  }

  
};
export const countUserPendingProjects = async (userId:number | undefined) => {
  'use server';


  try{

      const projects = await prisma.project.count({
        where:{
          userId: parseInt(userId as unknown as string),
          status:ProjectStatus.PENDING
        }
      })
      return projects
    

  }catch(error){
    console.error("Error fetching Count User Projects",error)
  }

  
};
export const countUserTotalProjects = async (userId:number | undefined) => {
  'use server';


  try{

      const projects = await prisma.project.count({
        where:{
          userId:parseInt(userId as unknown as string),
          status: {
            in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED, ProjectStatus.PENDING],
          },
        }
      })
      return projects
    

  }catch(error){
    console.error("Error fetching All Count User Projects",error)
  }

  
};
export const countUserAcceptedProjects = async (userId:number | undefined) => {
  'use server';


  try{

      const projects = await prisma.project.count({
        where:{
          userId:parseInt(userId as unknown as string),
          status:ProjectStatus.ACCEPTED
        }
      })
      return projects

  }catch(error){
    console.error("Error fetching All User Accepted Projects",error)
  }

  
};
export const countUserRejectedProjects = async (userId:number | undefined) => {
  'use server';


  try{
      const projects = await prisma.project.count({
        where:{
          userId:parseInt(userId as unknown as string),
          status:ProjectStatus.REJECTED
        }
      })
      return projects

  }catch(error){
    console.error("Error fetching All User Rejected Projects",error)
  }

  
};

export const fetchAdminDashboardProjects = async () => {
  'use server';

  const user = await getServerSession(authOptions)

  const dept = user?.school
  try{
    
    const projects = await prisma.project.findMany(
      {where:{
        status:ProjectStatus.PENDING,
        school:School[dept as keyof typeof School]
       },
        take: 5,
       }
      )
      return projects
    

  }catch(error){
    console.error("Error fetching Dashboard Admin Projects",error)
  }

  
};


export const fetchSingleProject = async (projectId:string) => {


  try{

      const project = await prisma.project.findUnique({
        where:{
          projectId:parseInt(projectId)
        },
         select: {
          projectId: true,
          title:true,
          ans1:true,
          ans2:true,
          ans3:true,
          ans4:true,
          status:true,
          school:true,
          userId:true,
          updatedBy:true,
          comment:true,
          moderatorComment:true,
          moderatorName:true,
          referredTo:true,

        },
      })


      return project
   

  }catch(error){
    console.error("Error fetching Single Project",error)
  }

  
};

export const fetchSingleDraft = async (projectId:string) => {


  try{

      const project = await prisma.draft.findUnique({
        where:{
          projectId:parseInt(projectId)
        },
         select: {
          projectId: true,
          title:true,
          ans1:true,
          ans2:true,
          ans3:true,
          ans4:true,
          school:true,
          userId:true,
        },
      })

      return project
   

  }catch(error){
    console.error("Error fetching Single Project",error)
  }

  
};

export const updateProject = async (formData: any) => {
    const status = formData.status;
    const projectId = formData.projectId;
    const comment = formData.comment;
    const updatedBy = formData.updatedBy
    const email = formData.email

    const statusEnum = ProjectStatus[status as keyof typeof ProjectStatus]


    

  try{

    if(status === 'REFERRED'){
      if(!email || email===''){
          throw new Error('Email missing')
      }
      const existingUser = await prisma.user.findFirst({
          where: {
            email:email
          },
        });

        const existingPreuser = await prisma.preuser.findFirst({
          where: {
            email:email
          },
        });
    
        if (!existingUser && !existingPreuser) {
          const moderator =await createPreuser(email)
        }
      
      const referredProject = await prisma.reference.create({
          data:{
              email:email,
              projectId:parseInt(projectId)
          }
      }) 

      if(referredProject){
        revalidatePath('/Admin/Dashboard')
          revalidatePath('/Admin/Referred')
          revalidatePath(`/Admin/Projects/${projectId}`)

  
      }
      else{
          return new Error('Something went wrong'); 
        
        }
    }
     


      const project = await prisma.project.update({
        where:{
          projectId:parseInt(projectId),
          status:ProjectStatus.PENDING,

        },
        data:{
          status:statusEnum,
          comment:comment,
          updatedBy:updatedBy,
        }
      })

      revalidatePath(`/Admin/Projects/${projectId}`)
       revalidatePath('/Admin/Dashboard')
       revalidatePath('/Admin/Projects')

       return project

  }catch(error){
    console.error("Error Updating Project",error)
  }
 
};
export const updateDraft = async (formData: any) => {
    const projectId = formData.id;
    const title = formData.title
    const ans1 = formData.ans1
    const ans2 = formData.ans2
    const ans3 = formData.ans3
    const ans4 = formData.ans4
    const school = formData.schoolFromFormData

   

    

  try{

      const project = await prisma.draft.update({
        where:{
          projectId:parseInt(projectId),

        },
        data:{
          school:School[school as keyof typeof School],
          title:title,
          ans1:ans1,
          ans2:ans2,
          ans3:ans3,
          ans4:ans4,
        }
      })

      revalidatePath(`/Admin/Projects/${projectId}`)
       revalidatePath('/Admin/Dashboard')
       revalidatePath('/Admin/Projects')

       return project

  }catch(error){
    console.error("Error Updating Project",error)
  }
 
};

export const updateUser = async (formData: FormData) => {
  'use server';
  const userId = formData.get('userId') as string;
  const school = formData.get('school') as  string;


  const email = formData.get('email') as string | null;
  const userType = formData.get('userType') as string | null;
  const registrationNumber = formData.get('registrationNumber') as string | null;
  const password = formData.get('password') as string | null;

  try {
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

    
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: data,
    });

    revalidatePath(`/SuperAdmin/Users/${userId}`);
    revalidatePath('/SuperAdmin/Users');

    return updatedUser;
  } catch (error) {
    console.error('Error Updating User', error);
  } finally {
    redirect('/SuperAdmin/Users');
  }
};

export const fetchUser = async (email:string) => {
  'use server';
    

  try{

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email:true,
        userType:true,
        firstName:true,
        secondName:true,
        registrationNumber:true,
        hashedPassword:true,
        school:true,

      },
    });



    return user;

  }catch(error){
    console.error("Error Fetching User",error)
  }

  
};



export const countUsers = async () => {
  'use server';


  try{


      const users = await prisma.user.count({
        where:{
          userType:UserType.STUDENT
        }
      })
      return users
   

  }catch(error){
    console.error("Error Counting all users",error)
  }

  
};
export const countAdmin = async () => {
  'use server';


  try{
   

    const users = await prisma.user.count({
      where:{
        userType:UserType.ADMIN
      }
    })
    return users
   

  }catch(error){
    console.error("Error counting Admins",error)
  }

  
};

export const countPendingUsers = async () => {
  'use server';


  try{
   

    const users = await prisma.preuser.count()
    return users
   

  }catch(error){
    console.error("Error counting Pre users",error)
  }

  
};



export const fetchUsers = async (query: string) => {
  try {
    if (typeof query === 'string' && query.trim()) {
      const users = await prisma.user.findMany({
        where: {
          userType: {
            in: [UserType.STUDENT,UserType.ADMIN,UserType.MODERATOR],
          }, 
          OR: [
            {
              registrationNumber: {
                contains: query.trim(),
              },
            },
            {
              firstName: {
                contains: query.trim(),
              },
            },
          ],
        },
      });
      return users;
    }

    const users = await prisma.user.findMany(
      {
        where:{
          userType: {
            in: [UserType.STUDENT,UserType.ADMIN,UserType.MODERATOR],
          }
        }
      }
    );
    return users;
  } catch (error) {
    console.error('Error fetching All Users ', error);
    throw error; 
  } finally {
    await prisma.$disconnect();
  }
};


export const fetchSuperAdminUser = async (userId:string) => {
  'use server';

  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId)
         },
      select: {
        id: true,
        email:true,
        userType:true,
        firstName:true,
        secondName:true,
        registrationNumber:true,
        hashedPassword:true,
        school:true,

      },
    });



    return user;

  }catch(error){
    console.error("Error Fetching Super Admin Single User",error)
  }

  
};

export const createUser = async (formData: any) => {
  
  const firstName = formData.firstName
  const secondName = formData.secondName
  const email = formData.email;
  const registrationNumber = formData.registrationNumber;
  const userType = formData.userType;
  const password = formData.password;
  const school = formData.school;

  

  try {
    if (!email || !firstName || !secondName || !registrationNumber || !userType || !password || !school ) {
      throw new Error('Required field is missing'); 
    }

     const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        firstName:firstName,
        secondName:secondName,
        email:email,
        registrationNumber:registrationNumber,
        userType:UserType[userType as keyof typeof UserType],
        hashedPassword:hashedPassword,
        school:School[school as keyof typeof School],
    },
    });

    revalidatePath('/SuperAdmin/Users');

    return newUser;
  } catch (error) {
    console.error('Error Creating User', error);
  } 
};
export const validate = async (formData: any) => {
  
  const firstName = formData.firstName
  const secondName = formData.secondName
  const email = formData.email;
  const registrationNumber = formData.registrationNumber;
  const userType = formData.userType;
  const hashedPassword = formData.hashedPassword;
  const status = formData.status;

  

  try {
    if (!email || !firstName || !secondName || !registrationNumber || !userType || !hashedPassword || !status ) {
      throw new Error('Required field is missing'); 
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
        text:` Hello  ${firstName} , your request your request to access MMUST Online Project Proposal System has been approved successfully `,
        html: `<b> Hello ${firstName} , your request  to access MMUST Online Project Proposal System has been approved </b>`, 
      });
    
      console.log("Message sent,user accepted: %s", info.messageId);

      if (newUser) {
        const deletedUser = await prisma.preuser.delete({
          where: {
            email: email,
          },
        });


        if (deletedUser) {
          revalidatePath('/SuperAdmin/Users');
          revalidatePath('/SuperAdmin/Pending');

          
        } else {
          throw new Error('Error deleting preuser');
        }
      } 
      
      
      else {
        throw new Error('Error Creating user');


      }

      return newUser

    } else {
      const deletedUser = await prisma.preuser.delete({
        where: {
          email: email,
        },
      });


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
        text:` Hello ${firstName} , your request to access MMUST Online Project Proposal System has been denied  `,
        html: `<b> Hello , your request to access MMUST Online Project Proposal System has been denied  </b>`, 
      });

      console.log("Message sent,user declined: %s", info.messageId);

      

    revalidatePath('/SuperAdmin/Pending');

    return deletedUser;
  }
} catch (error) {
    console.error('Error Creating User', error);
  } 
};


export const deleteSingleUser = async (formData: FormData) => {
  'use server';


  const userId = formData.get('userId') as string;

  try {
    const projectsToDelete = await prisma.project.findMany({
      where: {
        userId: parseInt(userId),
      },
    });


    await Promise.all(projectsToDelete.map(async (project) => {
      await prisma.project.delete({
        where: {
          projectId: project.projectId,
        },
      });
    }));

    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });


    revalidatePath('/SuperAdmin/Users');
  } catch (error) {
    console.error("Error Deleting Single User", error);
  }
};


export const deleteSingleProject = async (formData: FormData) => {
  'use server';


  const projectId = formData.get('projectId') as string;

  try{

      const deletedProject=await prisma.project.delete({
        where:{
          status:ProjectStatus.PENDING,
          projectId:parseInt(projectId),
        }
      })


      revalidatePath('/Users/Projects')
   

  }catch(error){
    console.error("Error Deleting Single Project",error)
  }

  
};
export const deleteSingleDraft = async (formData: FormData) => {
  'use server';


  const projectId = formData.get('projectId') as string;

  try{

      const deletedProject=await prisma.draft.delete({
        where:{
          projectId:parseInt(projectId),
        }
      })


      revalidatePath('/Users/Drafts')
   

  }catch(error){
    console.error("Error Deleting Single Draft",error)
  }

  
};

export const fetchAllAdminReferredProjects = async ( query: string) => {
  'use server';

  const user = await getServerSession(authOptions)

    const dept = user?.school
    


  try {
    if  (typeof query === 'string' && query.trim() !== '') {
      const projects = await prisma.project.findMany({
        where: {
          status:ProjectStatus.REFERRED
          ,
          title: {
            contains: query.trim(),
          },
          school:School[dept as keyof typeof School]


        },
      });
      return projects;
    }

    const projects = await prisma.project.findMany({
      where: {
        status:ProjectStatus.REFERRED,
        school:School[dept as keyof typeof School]
      },
    });
    return projects;
  } catch (error) {
    console.error('Error fetching Admin Referred projects Projects', error);
  }
};
export const fetchAllModeratorReferredProjects = async (query: string) => {
  'use server';

  const user = await getServerSession(authOptions);

  try {
    let projects;

    if (typeof query === 'string' && query.trim() !== '') {
      
      projects = await prisma.reference.findMany({
        where: {
          email: user?.email,
          project: {
            title: {
              contains: query,
            },
          },
        },
        include: {
          project: {
            select: {
              projectId: true,
              title: true,
              createdAt: true,
              school: true,
            },
          },
        },
      });
    } else {
     
      projects = await prisma.reference.findMany({
        where: {
          email: user?.email,
        },
        include: {
          project: {
            select: {
              projectId: true,
              title: true,
              createdAt: true,
              school: true,
            },
          },
        },
      });
    }

    return projects;
  } catch (error) {
    console.error('Error fetching Referred Projects', error);
  }
};



export const fetchModeratorProjects = async () => {
  'use server';

  const user = await getServerSession(authOptions);

  try {
    const projects = await prisma.reference.findMany({
      where: {
        email: user?.email,
      },
      take: 5,
      include: {
        project: {
          select: {
            projectId: true,
            title: true, 
            createdAt:true,
            school:true,

          },
        },
      },
    });

    return projects;
  } catch (error) {
    console.error("Error fetching Dashboard Moderator Projects", error);
  }
};


export const referProject = async (formData: FormData) => {
  'use server';
    const status = formData.get('status') as string;
    const projectId = formData.get('projectId') as string;
    const comment = formData.get('comment') as string;
    const updatedBy = formData.get('updatedBy') as string;  
    
    const referTo = formData.get('email') as string;

    const statusEnum = ProjectStatus[status as keyof typeof ProjectStatus]
  try{
     


      const project = await prisma.project.update({
        where:{
          projectId:parseInt(projectId),
          status:ProjectStatus.PENDING,

        },
        data:{
          status:ProjectStatus.REFERRED,
          comment:comment,
          updatedBy:updatedBy,
        }
      })

      const referred = await prisma.reference.create({
        data:{
          email:referTo,
          projectId:parseInt(projectId),
        }
      })
      revalidatePath('/Admin/Dashboard')
      revalidatePath('/Admin/Projects')
      revalidatePath('/Admin/Reviewed')

  }catch(error){
    console.error("Error Referring  Project",error)
  }
  finally {
    
    redirect('/Admin/Projects')
  }

  
};

export const moderatorUpdateProject = async (formData: any) => {
  'use server';
    
    const status = formData.status;
    const projectId = formData.projectId;
    const moderatorComment = formData.moderatorComment;
    const moderatedBy = formData.moderatedBy;    

    const user = await getServerSession(authOptions) 

  try{
    const project = await prisma.project.update({
      where:{
        projectId:parseInt(projectId),
        status:ProjectStatus.REFERRED,
        
      },
      data:{
        status:ProjectStatus[status as keyof typeof ProjectStatus],
        moderatorComment:moderatorComment,
        moderatorName:moderatedBy,
      }
    })
    
    if(project){
      const deleteProject =  await prisma.reference.delete({
          where: {
            email_projectId: {
              email: user?.email,
              projectId: parseInt(projectId),
            },
          },
        });
    
        revalidatePath(`/Moderator/Projects/${projectId}`)
        revalidatePath('/Moderator/Dashboard')
        revalidatePath('/Moderator/Projects')

        return project
      }
  }catch(error){
    console.error("Error Updating Project",error)
  }
  
};

export const fetchPreusers = async (query: string) => {
  try {
    if (typeof query === 'string' && query.trim()) {
      const users = await prisma.preuser.findMany({
        where: {
          userType: {
            in: [UserType.STUDENT,UserType.ADMIN,UserType.MODERATOR],
          }, 
          OR: [
            {
              registrationNumber: {
                contains: query.trim(),
              },
            },
            {
              firstName: {
                contains: query.trim(),
              },
            },
            {
              email: {
                contains: query.trim(),
              },
            },
          ],
        },
      });
      return users;
    }

    const users = await prisma.preuser.findMany(
      {
        where:{
          userType: {
            in: [UserType.STUDENT,UserType.ADMIN,UserType.MODERATOR],
          }
        }
      }
    );
    return users;
  } catch (error) {
    console.error('Error fetching All Pending Users ', error);
    throw error; 
  } finally {
    await prisma.$disconnect();
  }
};


async function updateProjectsTask() {
  try {
    // const twoWeeksAgo = new Date();
    // twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    // Just for demo

    // const oneHourAgo = new Date();
    // oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const thirtySecondsAgo = new Date();
    thirtySecondsAgo.setSeconds(thirtySecondsAgo.getSeconds() - 30);

    const projectsToUpdate = await prisma.project.findMany({
      where: {
        status: 'REFERRED',
        createdAt: {
          // lte: twoWeeksAgo,
          // just for demo
          lte: thirtySecondsAgo,
        },
      },
    });

    for (const project of projectsToUpdate) {
      
      await prisma.project.update({
        where: {
          projectId: project.projectId,
        },
        data: {
          status: 'PENDING',
        },
      });

      await prisma.reference.deleteMany({
        where: {
          projectId: project.projectId,
        },
      });
    }
  } catch (error) {
    console.error('Error updating projects:', error);
  } finally {
    await prisma.$disconnect();
  }
}
// cron.schedule('0 0 * * *', () => {
//   updateProjectsTask();
// });

// just for demo
cron.schedule('*/30 * * * * *', () => {
  updateProjectsTask();
});

export const createPreuser = async (email:string ) => {
  
  if(!email){
    throw new Error('Required field is missing');
  }

  try {
    const firstName=email
    const secondName='Moderator'
    const password=email
    const userType = 'MODERATOR'
    const registrationNumber=email

     const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.preuser.create({
      data: {
        firstName:firstName,
        secondName:secondName,
        email:email,
        registrationNumber:registrationNumber,
        userType:userType,
        hashedPassword:hashedPassword,
    },
    });

    revalidatePath('/Admin/Dashboard');

    return newUser;
  } catch (error) {
    console.error('Error Creating User', error);
  } 
};



