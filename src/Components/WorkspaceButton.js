import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import WrkSpDropDown from "./WrkSpDropDown";

const WorkspaceButton = ({ wrkSpName, wrkSpColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative p-3 w-[250px]">
      <div className="h-12 relative rounded-t-xl bg-slate-200 text-black font-serif text-l text-center italic font-light tracking-wider ">
        {wrkSpName}
      </div>
      <div
        className="rounded-b-xl h-[180px]"
        style={{ backgroundColor: `#${wrkSpColor}` }}
      >
        <div
          className="absolute bg-slate-800  right-4 bottom-4 rounded-full bg-opacity-20 hover:bg-[#22a822]"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <CiMenuKebab size={30} color="#FFFFFF" />
        </div>
      </div>
      <div>
        <WrkSpDropDown isShowing={isOpen} />
      </div>
    </div>
  );
};

export default WorkspaceButton;
