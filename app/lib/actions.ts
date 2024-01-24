import {  ProjectStatus, School, UserType } from "@prisma/client";
import prisma from '@/app/lib/prismadb';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt'

export const addProject = async (formData: FormData) => {
  'use server';


  try {
    const schoolFromFormData = formData.get('schoolFromFormData');
    const title = formData.get('title') as string;
    const email = formData.get('email') as string;
    const ans1 = formData.get('ans1') as string;
    const ans2 = formData.get('ans2') as string;
    const ans3 = formData.get('ans3') as string;
    const ans4 = formData.get('ans4') as string;

    
    if (!email || !title || !ans1 || !ans2 || !ans3 || !ans4) {
      throw new Error('Required field is missing'); 
    }

    const schoolEnum = School[schoolFromFormData as keyof typeof School];

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      const userId = user.id;
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

      
    }
  } catch (error) {
    console.error(error, 'Failed to create project');
    
  } finally {
    
    redirect('/User/Dashboard');
  }
};


export const fetchUserDashboardProjects = async (userId:number | undefined) => {
  'use server';


  try{

      const projects = await prisma.project.findMany(
       {
        where: {
          userId: parseInt(userId as unknown as string),
          status:ProjectStatus.PENDING
        },
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
       }
      )
      return projects
    

  }catch(error){
    console.log("Error fetching Dashboard User Projects",error)
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
    console.log("Error fetching All User Projects",error)
  }

  
};

export const fetchAllAdminProjects = async (query:string) => {
  'use server';


  try{

    if  (typeof query === 'string' && query.trim() !== '') {
      const projects = await prisma.project.findMany({
        where: {
          title: {
            contains: query.trim(),
          },
        },
      });
      return projects;
    }

    const projects = await prisma.project.findMany()
      return projects
    

  }catch(error){
    console.error("Error fetching All Projects",error)
  }

  
};


export const fetchAllAdminReviewedProjects = async ( query: string) => {
  'use server';

  try {
    if  (typeof query === 'string' && query.trim() !== '') {
      const projects = await prisma.project.findMany({
        where: {
          status: {
            in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED],
          },
          title: {
            contains: query.trim(),
          },
        },
      });
      return projects;
    }

    const projects = await prisma.project.findMany({
      where: {
        status: {
          in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED],
        },
      },
    });
    return projects;
  } catch (error) {
    console.error('Error fetching Reviewed Projects', error);
  }
};

export const countAllProjects = async () => {
  'use server';


  try{

        const projects = await prisma.project.count({
        where:{
          status: {
            in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED, ProjectStatus.PENDING],
          },
        }
      })
      return projects
    

  }catch(error){
    console.error("Error fetching All Count Projects",error)
  }

  
};
export const countReviewedProjects = async () => {
  'use server';


  try{


      const projects = await prisma.project.count({
        where:{
          status: {
            in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED],
          },
        }
      })
      return projects
   

  }catch(error){
    console.error("Error fetching All Reviewed Projects",error)
  }

  
};
export const countPendingProjects = async () => {
  'use server';


  try{
   

      const projects = await prisma.project.count({
        where:{
          status:ProjectStatus.PENDING
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


  try{

      const projects = await prisma.project.findMany(
       {where:{
        status:ProjectStatus.PENDING
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
  'use server';

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
        },
      })
      return project
   

  }catch(error){
    console.error("Error fetching Single Project",error)
  }

  
};

export const updateProject = async (formData: FormData) => {
  'use server';
    
  console.log('UpdateProject',formData)
    const status = formData.get('status') as string;
    const projectId = formData.get('projectId') as string;
    const comment = formData.get('comment') as string;
    const updatedBy = formData.get('updatedBy') as string;    

    const statusEnum = ProjectStatus[status as keyof typeof ProjectStatus]


    

  try{
     


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
      console.log('Updated Project',project)

      revalidatePath('/Admin/Dashboard')
      revalidatePath('/Admin/Projects')
      revalidatePath('/Admin/Reviewed')

  }catch(error){
    console.error("Error Updating Project",error)
  }
  finally {
    
    redirect('/Admin/Projects')
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
    console.log('Error Updating User', error);
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
    console.log("Error Fetching User",error)
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




export const fetchUsers = async (query: string) => {
  try {
    if (typeof query === 'string' && query.trim()) {
      const users = await prisma.user.findMany({
        where: {
          userType: {
            in: [UserType.STUDENT,UserType.ADMIN],
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
            in: [UserType.STUDENT,UserType.ADMIN],
          }
        }
      }
    );
    return users;
  } catch (error) {
    console.log('Error fetching All Users ', error);
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
    console.log("Error Fetching Super Admin Single User",error)
  }

  
};

export const createUser = async (formData: FormData) => {
  'use server';
  
  const firstName = formData.get('firstName') as string;
  const secondName = formData.get('secondName') as string;
  const email = formData.get('email') as string ;
  const registrationNumber = formData.get('registrationNumber') as string;
  const userType = formData.get('userType') as UserType;
  const password = formData.get('password') as string;
  const school = formData.get('school') as  string;

  

  try {
    if (!email || !firstName || !secondName || !registrationNumber || !userType || !password || !school ) {
      console.log('Required field is missing');
      throw new Error('Required field is missing'); 
    }

     const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        firstName:firstName,
        secondName:secondName,
        email:email,
        registrationNumber:registrationNumber,
        userType:userType,
        hashedPassword:hashedPassword,
        school:School[school as keyof typeof School],
    },
    });

    revalidatePath('/SuperAdmin/Users');

    return newUser;
  } catch (error) {
    console.log('Error Creating User', error);
  } finally {
    redirect('/SuperAdmin/Users');
  }
};

export const deleteSingleUser = async (formData: FormData) => {
  'use server';

  console.log('Delete FormData', formData)

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
      revalidatePath('/Users/Projects')
   

  }catch(error){
    console.error("Error Deleting Single User",error)
  }

  
};

