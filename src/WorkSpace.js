import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const WorkSpace = () => {
  return (
    <div className="bg-[#001404] w-screen h-screen">
      <div className="flex flex-col">
        <div className=" h-10 w-auto border-b-2 border-[#39ad60] rounded-lg">
          <div
            className="p-1 absolute rounded-full hover:bg-[#64ed9f] hover:bg-opacity-40
                       border-b-4 border-r-2 border-[#64ed9f]"
          >
            <AiOutlineMenu size={25} color="#FFFFFF" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
