import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { AiOutlineMenu } from "react-icons/ai";

import Test from "./Test.pdf";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const WorkSpace = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    console.log(numPages);
    setPageNumber(50);
  }

  console.log(Test);

  return (
    <div className="bg-[#001404] w-screen h-screen">
      <div className="flex flex-col">
        <div className=" h-10 w-auto border-b-2 border-[#39ad60] rounded-lg">
          <div
            className="p-1 absolute rounded-full hover:bg-[#64ed9f] hover:bg-opacity-40 hover:cursor-pointer
                       border-b-4 border-r-2 border-[#64ed9f]"
          >
            <AiOutlineMenu size={25} color="#FFFFFF" />
          </div>
        </div>
        <div className=" h-96 w-96">
          <Document file={Test} onLoadSuccess={onDocumentLoadSuccess}>
            <Page height={600} width={900} pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
