import React, { useEffect, useRef } from "react";

const FileView = ({ containerRef }) => {
  const fileViewRefHeader = useRef(null);
  const fileViewRef = useRef(null);

  useEffect(() => {
    let startX;
    let startY;
    let LastX;
    let LastY;
    let isClicked;

    if (!fileViewRefHeader.current || !containerRef.current) return;
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
    };

    const onMouseMove = (e) => {
      if (isClicked) {
        fileViewer.style.top = `${e.clientY - startY + LastY}px`;
        fileViewer.style.left = `${e.clientX - startX + LastX}px`;
      }
    };

    ref.addEventListener("mousedown", onMouseDown);
    ref.addEventListener("mouseup", onMouseUp);
    ref.addEventListener("mouseleave", onMouseUp);
    container.addEventListener("mouseleave", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);

    const cleanup = () => {
      ref.removeEventListener("mousedown", onMouseDown);
      ref.removeEventListener("mouseup", onMouseUp);
      ref.removeEventListener("mouseleave", onMouseUp);
      container.removeEventListener("mouseleave", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
    };

    return cleanup;
  }, []);

  return (
    <div
      className="absolute flex flex-col max-h-[732px] resize overflow-auto"
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
