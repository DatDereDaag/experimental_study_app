import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import WrkSpDropDown from "./WrkSpDropDown";

const ipcRenderer = window.require("electron").ipcRenderer;

const WorkspaceButton = ({ wrkSpName, wrkSpColor, buttonKey, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative p-3 w-[250px]">
      <div
        className="h-12 relative rounded-t-xl bg-slate-200 text-black font-serif text-lg text-center italic font-light tracking-wider hover:cursor-pointer "
        onClick={() => {
          ipcRenderer.send("openWorkSpaceWindow");
        }}
      >
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
        <WrkSpDropDown
          isOpen={isOpen}
          onDeleteSent={() => {
            onDelete(buttonKey - 1);
          }}
        />
      </div>
    </div>
  );
};

export default WorkspaceButton;
