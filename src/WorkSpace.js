import React, { useEffect, useState, useRef } from "react";
import { Document, Page } from "react-pdf";
import {
  AiOutlineMenu,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";

import Test from "./Test.pdf";
import FileView from "./Components/FileView";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const WorkSpace = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [fileViews, setFileViews] = useState([]);

  const containerRef = useRef();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    console.log(numPages);
    setPageNumber(50);
  }

  const addNewFileView = () => {
    const updatedFileViews = [...fileViews];
    let fileViewKey = updatedFileViews.length;

    const newFileView = (
      <div key={fileViewKey}>
        <FileView containerRef={containerRef} />
      </div>
    );

    updatedFileViews.push(newFileView);
    setFileViews(updatedFileViews);
  };

  return (
    <div className="bg-[#001404] w-screen h-screen">
      <div className="flex flex-col">
        <div className=" h-10 relative w-auto border-b-2 border-[#39ad60] rounded-lg">
          <div>
            <div
              className="p-1 absolute rounded-full hover:bg-[#64ed9f] hover:bg-opacity-40
                      hover:cursor-pointer border-b-4 border-r-2 border-[#64ed9f]"
            >
              <AiOutlineMenu size={25} color="#FFFFFF" />
            </div>
            <div className=" flex items-center justify-center h-10">
              <div
                className="p-2 text-white  hover:text-[#64ed9f] hover:cursor-pointer"
                onClick={() => {
                  addNewFileView();
                }}
              >
                <AiFillPlusCircle size={22} />
              </div>
              <div
                className="p-2 text-white hover:text-[#fa23ba] hover:cursor-pointer"
                onClick={() => {}}
              >
                <AiFillMinusCircle size={22} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative" ref={containerRef}>
          {fileViews.map((fileView, index) => (
            <div key={index}>{fileView}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
