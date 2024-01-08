import { Prisma, ProjectStatus, School } from "@prisma/client";
import prisma from '@/app/lib/prismadb';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { title } from "process";
import { ProjectFormData } from "next-auth";




export const addProject = async (formData: FormData) => {
  'use server';

  console.log(formData);

  try {
    const schoolFromFormData = formData.get('schoolFromFormData');
    const title = formData.get('title') as string;
     const email = formData.get('email') as string;
    const ans1 = formData.get('ans1') as string;
    const ans2 = formData.get('ans2') as string;
    const ans3 = formData.get('ans3') as string;
    const ans4 = formData.get('ans4') as string;

    const schoolEnum = School[schoolFromFormData as keyof typeof School];
    if(!email){
        console.log('Email missing')
    }

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
          // comment:comment
          school:schoolEnum,
        },
      });

      revalidatePath('/User/Dashboard')
      
      // console.log(newProject, "New Project");

     
    }
  } catch (error) {
    console.error(error, 'Failed to create project');
    
  }
  finally {
    // Optionally redirect even if an error occurs, if desired
    redirect('/User/Dashboard');
}
};

export const fetchUserDashboardProjects = async (userId:number | undefined) => {
  'use server';


  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
      },
      select: {
        id: true,
      },
    });



    if (user) {

      const projects = await prisma.project.findMany(
       {
        where: {
          userId: user.id,
        },
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
       }
      )
      console.log('User Projects', projects)
      return projects
    }

  }catch(error){
    console.log("Error fetching Dashboard User Projects",error)
  }

  
};

export const fetchUserProjects = async (userId:number | undefined) => {
  'use server';


  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
      },
      select: {
        id: true,
      },
    });



    if (user) {

      const projects = await prisma.project.findMany(
       {
        where: {
          userId: user.id,
        },
       }
      )
      return projects
    }

  }catch(error){
    console.log("Error fetching All User Projects",error)
  }

  
};

export const fetchAllAdminProjects = async (userId:number | undefined,q:string) => {
  'use server';


  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
      },
      select: {
        id: true,
      },
    });

    

    if (user) {

      // if(q){
      //   const projects = await prisma.project.findMany(
      //     {where:{
      //       status:ProjectStatus.PENDING,
      //       title:q,
      //      }
      //      }
      //   )
  
      //   return projects
      // }

      const projects = await prisma.project.findMany(
        {where:{
          status:ProjectStatus.PENDING
         }
         }
      )
      return projects
    }

  }catch(error){
    console.error("Error fetching All Projects",error)
  }

  
};


export const fetchAllAdminReviewedProjects = async (userId:number | undefined,query:string) => {
  'use server';


  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
      },
      select: {
        id: true,
      },
    });



    if (user) {

      // if(query){

      //   const projects = await prisma.project.findMany(
      //     {where:{
      //       status:ProjectStatus.PENDING,
      //       title:query,
      //      }
      //      }
      //   )
  
      //   return projects
      // }

      const projects = await prisma.project.findMany(
        {where:{
          status: {
            in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED],
          },
         }
         }
      )
      return projects
    }

  }catch(error){
    console.error("Error fetching Reviewed Projects",error)
  }

  
};
export const countAllProjects = async (userId:number | undefined) => {
  'use server';


  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
      },
      select: {
        id: true,
      },
    });



    if (user) {

      const projects = await prisma.project.count({
        where:{
          status: {
            in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED, ProjectStatus.PENDING],
          },
        }
      })
      return projects
    }

  }catch(error){
    console.error("Error fetching All Count Projects",error)
  }

  
};
export const countReviewedProjects = async (userId:number | undefined) => {
  'use server';


  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
      },
      select: {
        id: true,
      },
    });



    if (user) {

      const projects = await prisma.project.count({
        where:{
          status: {
            in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED],
          },
        }
      })
      return projects
    }

  }catch(error){
    console.error("Error fetching All Reviewed Projects",error)
  }

  
};
export const countPendingProjects = async (userId:number | undefined) => {
  'use server';


  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
      },
      select: {
        id: true,
      },
    });



    if (user) {

      const projects = await prisma.project.count({
        where:{
          status:ProjectStatus.PENDING
        }
      })
      return projects
    }

  }catch(error){
    console.error("Error fetching All Pending Projects",error)
  }

  
};
export const countUserPendingProjects = async (userId:number | undefined) => {
  'use server';


  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
      },
      select: {
        id: true,
      },
    });



    if (user) {

      const projects = await prisma.project.count({
        where:{
          userId: parseInt(userId as unknown as string),
          status:ProjectStatus.PENDING
        }
      })
      return projects
    }

  }catch(error){
    console.error("Error fetching Count User Projects",error)
  }

  
};
export const countUserTotalProjects = async (userId:number | undefined) => {
  'use server';


  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
      },
      select: {
        id: true,
      },
    });



    if (user) {

      const projects = await prisma.project.count({
        where:{
          userId:parseInt(userId as unknown as string),
          status: {
            in: [ProjectStatus.ACCEPTED, ProjectStatus.REJECTED, ProjectStatus.PENDING],
          },
        }
      })
      return projects
    }

  }catch(error){
    console.error("Error fetching All Count User Projects",error)
  }

  
};
export const countUserAcceptedProjects = async (userId:number | undefined) => {
  'use server';


  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
      },
      select: {
        id: true,
      },
    });



    if (user) {

      const projects = await prisma.project.count({
        where:{
          userId:parseInt(userId as unknown as string),
          status:ProjectStatus.ACCEPTED
        }
      })
      return projects
    }

  }catch(error){
    console.error("Error fetching All User Accepted Projects",error)
  }

  
};
export const countUserRejectedProjects = async (userId:number | undefined) => {
  'use server';


  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
      },
      select: {
        id: true,
      },
    });



    if (user) {

      const projects = await prisma.project.count({
        where:{
          userId:parseInt(userId as unknown as string),
          status:ProjectStatus.REJECTED
        }
      })
      return projects
    }

  }catch(error){
    console.error("Error fetching All User Rejected Projects",error)
  }

  
};

export const fetchAdminDashboardProjects = async (userId:number | undefined) => {
  'use server';


  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
       
      },
      select: {
        id: true,
      }
    });



    if (user) {

      const projects = await prisma.project.findMany(
       {where:{
        status:ProjectStatus.PENDING
       },
        take: 5,
       }
      )
      return projects
    }

  }catch(error){
    console.error("Error fetching Dashboard Admin Projects",error)
  }

  
};


export const fetchSingleProject = async (userId:number | undefined,projectId:string) => {
  'use server';

  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId as unknown as string),
      },
      select: {
        id: true,
      },
    });



    if (user) {

      const project = await prisma.project.findUnique({
        where:{
          projectId:parseInt(projectId)
        },
         select: {
          projectId: true,
          ans1:true,
          ans2:true,
          ans3:true,
          ans4:true,
          status:true,
          school:true,
          userId:true,
        },
      })
      return project
    }

  }catch(error){
    console.error("Error fetching Single Project",error)
  }

  
};

export const updateProject = async (formData: FormData) => {
  'use server';
    console.log(formData)
    

    const userId = formData.get('userId') as string;
    const status = formData.get('status') as string;
    const projectId = formData.get('projectId') as string;
    // const comment = formData.get('comment') as string;
    // const amount = formData.get('amount') as string;

    const statusEnum = ProjectStatus[status as keyof typeof ProjectStatus]


    

  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        id: true,
      },
    });



    if (user) {

      // if(amount){

      //   const project = await prisma.project.update({
      //     where:{
      //       projectId:parseInt(projectId),
      //       status:ProjectStatus.ACCEPTED,
  
      //     },
      //     data:{
      //       // Payment:parseInt(amount)
      //     }
      //   })

      // }


      const project = await prisma.project.update({
        where:{
          projectId:parseInt(projectId),
          status:ProjectStatus.PENDING,

        },
        data:{
          status:statusEnum
          // comment:comment
        }
      })

      revalidatePath('/Admin/Dashboard')
      revalidatePath('/Admin/Projects')
      revalidatePath('/Admin/Reviewed')


     
    }


  }catch(error){
    console.error("Error Updating Project",error)
  }
  finally {
    
    redirect('/Admin/Projects')
  }

  
};
// Updating the user info based on the client needs[Awaiting details from the system consumer]
// export const updateUser = async (formData) => {
//   'use server';
//     const {userId,image} = Object.fromEntries(formData)

//   try{

//     const user = await prisma.user.findUnique({
//       where: {
//         id: parseInt(userId),
//       },
//       select: {
//         id: true,
//       },
//     });



//     if (user) {
//       const newUser = await prisma.user.update({
//         where:{
//           id:parseInt(userId)
//         },
//         data:{

//         }
//       })
     
//       revalidatePath('/Admin/Profile')
//       revalidatePath('/User/Profile')
      
//       return newUser
//     }

//   }catch(error){
//     console.log("Error Updating User",error)
//   }

  
// };
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
        // status:true

      },
    });



    return user;

  }catch(error){
    console.log("Error Fetching User",error)
  }

  
};



