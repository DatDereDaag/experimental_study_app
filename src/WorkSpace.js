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
  const [resizeTracker, setResizeTracker] = useState(0);

  const containerRef = useRef();

  const upperLeftRef = useRef();
  const upperRightRef = useRef();
  const lowerLeftRef = useRef();
  const lowerRightRef = useRef();

  const fileViewerRefs = useRef([]);

  //useEffect(() => {
  //  const container = containerRef.current;
  //
  //  const upperLeft = upperLeftRef.current;
  //  const upperRight = upperRightRef.current;
  //
  //  const lowerLeft = lowerLeftRef.current;
  //  const lowerRight = lowerRightRef.current;
  //
  //  const rectsArray = [upperLeft, upperRight, lowerLeft, lowerRight];
  //
  //  const onMouseMove = () => {
  //    fileViewerRefs.current.forEach((element, index) => {
  //      const fileVIewRect = element.getBoundingClientRect();
  //      for (let i = 0; i < 4; i++) {
  //        const currentLocRect = rectsArray[i].getBoundingClientRect();
  //        const overlap =
  //          fileVIewRect.top >= currentLocRect.top &&
  //          fileVIewRect.bottom <= currentLocRect.bottom &&
  //          fileVIewRect.left >= currentLocRect.left &&
  //          fileVIewRect.right <= currentLocRect.right;
  //        if (overlap) {
  //          console.log(`overlap at ${i}`);
  //        }
  //      }
  //    });
  //  };
  //
  //   container.addEventListener("mousemove", onMouseMove);
  //
  //   const cleanup = () => {
  //     container.removeEventListener("mousemove", onMouseMove);
  //   };
  //
  //   return cleanup;
  // }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    console.log(numPages);
    setPageNumber(50);
  }

  const setFileViewerRefs = (index, ref) => {
    fileViewerRefs.current[index] = ref;
  };

  const addNewFileView = () => {
    const updatedFileViews = [...fileViews];
    let fileViewKey = updatedFileViews.length;

    const newFileView = (
      <FileView
        containerRef={containerRef}
        refId={fileViewKey}
        onDimensionCheck={(val) => setResizeTracker(val)}
      />
    );

    updatedFileViews.push(newFileView);
    setFileViews(updatedFileViews);
  };

  return (
    <div className="bg-[#001404] w-screen h-screen flex flex-col">
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
      <div
        className="relative h-full grid grid-cols-2 grid-rows-2"
        ref={containerRef}
      >
        <div className=" bg-slate-700 w-full h-full  " ref={upperLeftRef}>
          hello
        </div>
        <div className=" bg-slate-700 w-full h-full  " ref={upperRightRef}>
          hello
        </div>
        <div className=" bg-slate-700 w-full h-full  " ref={lowerLeftRef}>
          hello
        </div>
        <div className=" bg-slate-700 w-full h-full " ref={lowerRightRef}>
          hello
        </div>
        {fileViews.map((fileView, index) => (
          <div
            className="absolute"
            key={index}
            ref={(ref) => setFileViewerRefs(index, ref)}
          >
            {fileView}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkSpace;
