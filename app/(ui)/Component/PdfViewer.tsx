import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = ({ pdfUrl }:{pdfUrl:string}) => {
  return (
    <div className='h-[750px]'>
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  );
};

export default PDFViewer;



 {/* <PdfViewer pdfUrl={'https://res.cloudinary.com/dwav3nker/image/upload/v1709709273/tbtljtzlb23gta6jpeiv.pdf'}/> */}