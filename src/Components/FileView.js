import React, { useEffect, useRef, useState } from "react";

const FileView = ({ containerRef }) => {
  const fileViewRefHeader = useRef(null);
  const fileViewRef = useRef(null);

  useEffect(() => {
    let startX;
    let startY;
    let LastX;
    let LastY;
    let isClicked;
    let currentYPos = 0;
    let currentXPos = 0;

    if (
      !fileViewRefHeader.current ||
      !containerRef.current ||
      !fileViewRef.current
    )
      return;

    const ref = fileViewRefHeader.current;
    const fileViewer = fileViewRef.current;
    const container = containerRef.current;

    const onMouseDown = (e) => {
      isClicked = true;
      startX = e.clientX;
      startY = e.clientY;
    };

    const onMouseUp = (e) => {
      isClicked = false;
      LastX = fileViewer.offsetLeft;
      LastY = fileViewer.offsetTop;

      checkDimension();
    };

    const onMouseMove = (e) => {
      if (isClicked) {
        let newPosY = e.clientY - startY + LastY;
        let newPosX = e.clientX - startX + LastX;
        currentYPos = newPosY;
        currentXPos = newPosX;

        //Handle Top Pos when moving within container
        if (fileViewer.offsetHeight + newPosY > 733) {
          fileViewer.style.top = `${
            newPosY - (fileViewer.offsetHeight + newPosY - 733)
          }px`;
        } else if (newPosY < 0) {
          fileViewer.style.top = `0px`;
        } else {
          fileViewer.style.top = `${newPosY}px`;
        }
        //Handle Left Pos when moving within container
        if (fileViewer.offsetWidth + newPosX > 1536) {
          fileViewer.style.left = `${
            newPosX - (fileViewer.offsetWidth + newPosX - 1536)
          }px`;
        } else if (newPosX < 0) {
          fileViewer.style.left = `0px`;
        } else {
          fileViewer.style.left = `${newPosX}px`;
        }
        //console.log("top " + fileViewer.style.top);
        //console.log("left " + fileViewer.style.left);
        //console.log("offsetY" + fileViewer.offsetHeight);
        //console.log("offsetX" + fileViewer.offsetWidth);
        //console.log("new y " + (newPosY + fileViewer.offsetHeight));
        //console.log("new x " + (newPosX + fileViewer.offsetWidth));
      }
    };

    const handleResize = (e) => {
      fileViewer.style.resize = "both";

      //handle Y Coord Resize
      if (fileViewer.offsetHeight + currentYPos >= 730) {
        fileViewer.style.maxHeight = `${fileViewer.offsetHeight}px`;
      } else {
        fileViewer.style.maxHeight = `730px`;
      }

      //handle X Coord Resize
      if (fileViewer.offsetWidth + currentXPos >= 1532) {
        fileViewer.style.maxWidth = `${fileViewer.offsetWidth}px`;
      } else {
        fileViewer.style.maxWidth = `1532px`;
      }
    };

    const checkDimension = () => {
      const fileViewerRect = fileViewer.getBoundingClientRect();
      const fileViewerWidth = fileViewerRect.width;
      const fileViewerHeight = fileViewerRect.height;
      const fileViewerTop = fileViewerRect.top;
      const fileViewerBottom = fileViewerRect.bottom;
      const fileViewerLeft = fileViewerRect.left;
      const fileViewerRight = fileViewerRect.right;
    };

    ref.addEventListener("mousedown", onMouseDown);
    ref.addEventListener("mouseleave", onMouseUp);
    container.addEventListener("mouseup", onMouseUp);
    fileViewer.addEventListener("mousemove", handleResize);
    fileViewer.addEventListener("mouseleave", () => {
      fileViewer.style.resize = "none";
    });
    container.addEventListener("mouseleave", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    const cleanup = () => {
      ref.removeEventListener("mousedown", onMouseDown);
      ref.removeEventListener("mouseleave", onMouseUp);
      container.removeEventListener("mouseup", onMouseUp);
      fileViewer.removeEventListener("mousemove", handleResize);
      fileViewer.removeEventListener("mouseleave", () => {
        fileViewer.style.resize = "none";
      });
      container.removeEventListener("mouseleave", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };

    return cleanup;
  }, []);

  return (
    <div
      className="absolute flex flex-col min-w-[200px] min-h-[216px] max-h-[730px] max-w-[1532px] resize-none overflow-auto"
      ref={fileViewRef}
    >
      <div
        className=" min-h-[16px] max-h-[16px] min-w-[200px] bg-green-500 hover:cursor-move"
        ref={fileViewRefHeader}
      ></div>
      <div className=" bg-white min-w-[200px] min-h-[200px] h-full">
        <div className=" flex flex-col"></div>
        FileView
      </div>
    </div>
  );
};

export default FileView;
