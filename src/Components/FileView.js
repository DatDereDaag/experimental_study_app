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
      console.log("down");
    };

    const onMouseUp = (e) => {
      isClicked = false;
      LastX = fileViewer.offsetLeft;
      LastY = fileViewer.offsetTop;
      console.log("up");
    };

    const onMouseMove = (e) => {
      console.log("moving");
      console.log(isClicked);
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

  console.log("ref " + containerRef);

  return (
    <div className="absolute flex flex-col" ref={fileViewRef}>
      <div
        className=" h-4 bg-green-500 hover:cursor-move"
        ref={fileViewRefHeader}
      ></div>
      <div className=" bg-white w-[250px] h-[250px]">
        <div className=" flex flex-col"></div>
        FileView
      </div>
    </div>
  );
};

export default FileView;
