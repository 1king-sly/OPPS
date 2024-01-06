import { Prisma, ProjectStatus, School } from "@prisma/client";
import prisma from '@/app/lib/prismadb';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import router from "next/navigation";


export const addProject = async (formData) => {
  'use server';

  console.log(formData);

  try {
    const { schoolFromFormData,title, email, ans1, ans2, ans3, ans4 } = Object.fromEntries(formData);

    const schoolEnum = School[schoolFromFormData.toUpperCase()]

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


    console.log(user, "User");

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
          school:schoolEnum,
        },
      });

      revalidatePath('/User/Dashboard')
      
      
      console.log(newProject, "New Project");

     
    }
  } catch (error) {
    console.error(error, 'Failed to create project');
    
  }
};

export const fetchUserDashboardProjects = async (userId) => {
  'use server';


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

      const projects = await prisma.project.findMany(
       {
        where: {
          userId: user.id,
        },
        take: 5,
       }
      )
      console.log('User Projects', projects)
      return projects
    }

  }catch(error){
    console.log("Error fetching Dashboard User Projects",error)
  }

  
};

export const fetchUserProjects = async (userId) => {
  'use server';


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

export const fetchAllAdminProjects = async (userId) => {
  'use server';


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


export const fetchAllAdminReviewedProjects = async (userId) => {
  'use server';


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
export const countAllProjects = async (userId) => {
  'use server';


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
export const countReviewedProjects = async (userId) => {
  'use server';


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
export const countPendingProjects = async (userId) => {
  'use server';


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
export const countUserPendingProjects = async (userId) => {
  'use server';


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

      const projects = await prisma.project.count({
        where:{
          userId: parseInt(userId),
          status:ProjectStatus.PENDING
        }
      })
      return projects
    }

  }catch(error){
    console.error("Error fetching Count User Projects",error)
  }

  
};
export const countUserTotalProjects = async (userId) => {
  'use server';


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

      const projects = await prisma.project.count({
        where:{
          userId:parseInt(userId),
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
export const countUserAcceptedProjects = async (userId) => {
  'use server';


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

      const projects = await prisma.project.count({
        where:{
          userId:parseInt(userId),
          status:ProjectStatus.ACCEPTED
        }
      })
      return projects
    }

  }catch(error){
    console.error("Error fetching All User Accepted Projects",error)
  }

  
};
export const countUserRejectedProjects = async (userId) => {
  'use server';


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

      const projects = await prisma.project.count({
        where:{
          userId:parseInt(userId),
          status:ProjectStatus.REJECTED
        }
      })
      return projects
    }

  }catch(error){
    console.error("Error fetching All User Rejected Projects",error)
  }

  
};

export const fetchAdminDashboardProjects = async (userId) => {
  'use server';

  console.log('User Id', userId)

  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
       
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


export const fetchSingleProject = async (userId,projectId) => {
  'use server';

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

export const updateProject = async (formData) => {
  'use server';
    console.log(formData)
    const {userId,status,projectId} = Object.fromEntries(formData)

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


      

      const project = await prisma.project.update({
        where:{
          projectId:parseInt(projectId),
          status:ProjectStatus.PENDING,

        },
        data:{
          status:ProjectStatus[status]
        }
      })
      revalidatePath('/Admin/Dashboard')
      revalidatePath('/Admin/Projects')
      revalidatePath('/User/Dashboard')
      revalidatePath('/User/Projects')
      revalidatePath('/Admin/Reviewed')

      console.log("New Project", project)
      return project
    }


  }catch(error){
    console.error("Error Updating Project",error)
  }

  
};
// Updating the user info based on the client needs[Awaiting details from the system consumer]
export const updateUser = async (formData) => {
  'use server';
    const {userId,image} = Object.fromEntries(formData)

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
      const newUser = await prisma.user.update({
        where:{
          id:parseInt(userId)
        },
        data:{

        }
      })
     
      revalidatePath('/Admin/Profile')
      revalidatePath('/User/Profile')
      
      return newUser
    }

  }catch(error){
    console.log("Error Updating User",error)
  }

  
};
export const fetchUser = async (userId) => {
  'use server';
    

  try{

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        id: true,
        email:true,
        userType:true,
        firstName:true,
        secondName:true,
        registrationNumber:true,
      },
    });



    return user;

  }catch(error){
    console.log("Error Fetching User",error)
  }

  
};



