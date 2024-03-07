'use client'
import React, { useState } from 'react'
import PdfViewer from '../../Component/PdfViewer';
import UpdateProject from './UpdateProject'

export default function View({project,userName,projectId,userId}:{project:any,userName?:string,projectId?:string,userId?:any}) {

    const [visiblePdfViewer, setVisiblePdfViewer] = useState<number | null>(null);

    const togglePdfViewer = (index: number) => {
      if (visiblePdfViewer === index) {
        setVisiblePdfViewer(null);
      } else {
        setVisiblePdfViewer(index);
      }
    };

    const getButtonText = (index: number) => {
        return visiblePdfViewer === index ? 'Close File' : 'View File';
      };
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center pb-40 mt-4'>
    <div className='flex flex-col items-center'>
      <div className='w-5/6 mx-auto flex flex-col text-black gap-10'>
       
        <div>
        <h1 className='w-full flex justify-center md:text-lg gap-1'>Title: <span className=' underline'>{project?.title}</span>  </h1>

        <div className='  px-4'>
            <div className='w-full flex  justify-center '>Problem identification and background/Needs assessment</div>
        </div>
        <div className='mt-2  px-4 bg-gray-100 py-10 relative  '>
          <p className=' text-md'>{project?.ans1} </p>
          {project?.file1 !== null && project?.file1 !== '' ?(
            <>
            <div className='absolute bottom-0 right-0 mt-2'>
                <button className='w-fit h-fit p-1 bg-sky-300 rounded-md text-xs' onClick={() => togglePdfViewer(1)}>{getButtonText(1)}</button>
                </div>
                {visiblePdfViewer === 1 && (
                <div className='pdf-viewer'> 
                        <PdfViewer pdfUrl={project.file1}/>
                    </div>
          )}
                </>
              ):null}
        </div>
        </div>
        <div>
        <div className='  px-4'>
            <div className='w-full flex  justify-center '>Research Purpose and anticipated results</div>
          
        </div>
        <div className='mt-2  px-4 bg-gray-100 py-10 relative  '>
          <p className=' text-md  '>{project?.ans2} </p>
          {project?.file2 !== null && project?.file2 !== '' ?(
            <>
            <div className='absolute bottom-0 right-0 mt-2'>
                <button className='w-fit h-fit p-1 bg-sky-300 rounded-md text-xs' onClick={() => togglePdfViewer(2)}>{getButtonText(2)}</button>
                </div>
                {visiblePdfViewer === 2 && (
                <div className='pdf-viewer'> 
                        <PdfViewer pdfUrl={project.file2}/>
                    </div>
          )}
                </>
              ):null}
        </div>
        </div>
        <div>
        <div className='  px-4'>
            <div className='w-full flex  justify-center '>Project Design and Methodology</div>
            <div className=' text-sm'>Outline the approach and methodology behind the project. Explain why they are the most suitable for achieving the project’s objectives.</div>
        </div>
        <div className='mt-2  px-4 bg-gray-100 py-10 relative '>
          <p className=' text-md  '>{project?.ans3} </p>
          {project?.file3 !== null && project?.file3 !== '' ?(
            <>
            <div className='absolute bottom-0 right-0 mt-2'>
                <button className='w-fit h-fit p-1 bg-sky-300 rounded-md text-xs' onClick={() => togglePdfViewer(3)}>{getButtonText(3)}</button>
                </div>
                {visiblePdfViewer === 3 && (
                <div className='pdf-viewer'> 
                        <PdfViewer pdfUrl={project.file3}/>
                    </div>
          )}
                </>
              ):null}
        </div>
        </div>
        <div>
        <div className='  px-4'>
            <div className='w-full flex  justify-center '> Gender Equality, Equity, and Inclusion considerations</div>
        </div>
        <div className='mt-2  px-4 bg-gray-100 py-10 relative  '>
          <p className=' text-md  '>{project?.ans4} </p>
          {project?.file4 !== null && project?.file4 !== '' ?(
            <>
            <div className='absolute bottom-0 right-0 mt-2'>
                <button className='w-fit h-fit p-1 bg-sky-300 rounded-md text-xs' onClick={() => togglePdfViewer(4)}>{getButtonText(4)}</button>
                </div>
                {visiblePdfViewer === 4 && (
                <div className='pdf-viewer'> 
                        <PdfViewer pdfUrl={project.file4}/>
                    </div>
          )}
                </>
              ):null}
        </div>
        {project?.updatedBy !== null || project?.updatedBy==='' ?(
          <>
           <div className='  px-4 mt-4'>
            <div className='w-full flex   font-semibold gap-1'>Reviewed By: <span
            className=''>{project?.updatedBy} </span></div>
        </div>
        {project?.comment!==null || project?.comment === ''?(
          <>
          <div className='mt-2  px-4 bg-gray-100 py-2 '>
          <p className=' text-md'>{project?.comment} </p>
        </div>
          </>
        ):null}
        
          </>
        ):null}
         {project?.moderatorComment !== null || project?.moderatorComment=='' ?(
          <>
           <div className='  px-4 mt-4'>
            <div className='w-full flex   font-semibold gap-1'>Moderator Comment: <span
            className=''>{project?.moderatorName} </span></div>
        </div>
        <div className='mt-2  px-4 bg-gray-100 py-2 '>
          <p className=' text-md'>{project?.moderatorComment} </p>
        </div>
          </>
        ):null}
        </div>
      <div>
        { project?.status === 'REFERRED'?(
            <>
        <UpdateProject userId={userId} projectId={projectId || ''} userName={userName || ''}  />
        </>
        ): null}
      </div>
      </div>
    </div>
   </div>  )
}
