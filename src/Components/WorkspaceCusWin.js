import { useState } from "react";
import { act } from "react-dom/test-utils";

const WorkspaceButtonOver = ({ wrkSpCus, onCancel, onConfirm }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(1);
  const [name, setName] = useState("New Workspace");
  const [color, setColor] = useState("a60808");
  return (
    wrkSpCus && (
      <div className="fixed top-1/3 right-1/3 bg-gradient-to-t from-[#000d04]  to-[#012e02] rounded-3xl shadow-xl border-2 border-[#020617]">
        <div className="h-[315px] w-[350px]">
          <div className=" text-white text-[20px] text-center font-semibold font-raleway tracking-wide p-2">
            Please enter the name along with the color for your new Workspace!
          </div>
          <div className="pt-4">
            <input
              className=" w-[300px] h-[35px] rounded-xl ml-6"
              type="text"
              placeholder="Workspace Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="flex pt-6 px-3">
            <div className="px-2">
              <div
                className={
                  activeButtonIndex === 1
                    ? " w-[40px] h-[40px] rounded-full bg-[#a60808] border-2 border-slate-50 hover:cursor-pointer"
                    : " w-[40px] h-[40px] rounded-full bg-[#a60808] hover:cursor-pointer"
                }
                onClick={() => {
                  {
                    setColor("a60808");
                    setActiveButtonIndex(1);
                  }
                }}
              ></div>
            </div>
            <div className="px-2">
              <div
                className={
                  activeButtonIndex === 2
                    ? " w-[40px] h-[40px] rounded-full bg-[#16a608] border-2 border-slate-50 hover:cursor-pointer"
                    : " w-[40px] h-[40px] rounded-full bg-[#16a608] hover:cursor-pointer"
                }
                onClick={() => {
                  setColor("16a608");
                  setActiveButtonIndex(2);
                }}
              ></div>
            </div>
            <div className="px-2">
              <div
                className={
                  activeButtonIndex === 3
                    ? " w-[40px] h-[40px] rounded-full bg-[#2127d1] border-2 border-slate-50 hover:cursor-pointer"
                    : " w-[40px] h-[40px] rounded-full bg-[#2127d1] hover:cursor-pointer"
                }
                onClick={() => {
                  setColor("2127d1");
                  setActiveButtonIndex(3);
                }}
              ></div>
            </div>
            <div className="px-2">
              <div
                className={
                  activeButtonIndex === 4
                    ? " w-[40px] h-[40px] rounded-full bg-[#08a1a6] border-2 border-slate-50 hover:cursor-pointer"
                    : " w-[40px] h-[40px] rounded-full bg-[#08a1a6] hover:cursor-pointer"
                }
                onClick={() => {
                  setColor("08a1a6");
                  setActiveButtonIndex(4);
                }}
              ></div>
            </div>
            <div className="px-2">
              <div
                className={
                  activeButtonIndex === 5
                    ? " w-[40px] h-[40px] rounded-full bg-[#ac1bbf] border-2 border-slate-50 hover:cursor-pointer"
                    : " w-[40px] h-[40px] rounded-full bg-[#ac1bbf] hover:cursor-pointer"
                }
                onClick={() => {
                  setColor("ac1bbf");
                  setActiveButtonIndex(5);
                }}
              ></div>
            </div>
            <div className="px-2">
              <div
                className={
                  activeButtonIndex === 6
                    ? " w-[40px] h-[40px] rounded-full bg-[#6d1bbf] border-2 border-slate-50 hover:cursor-pointer"
                    : " w-[40px] h-[40px] rounded-full bg-[#6d1bbf] hover:cursor-pointer"
                }
                onClick={() => {
                  setColor("6d1bbf");
                  setActiveButtonIndex(6);
                }}
              ></div>
            </div>
          </div>
          <div className="flex gap-[76px] ml-7 p-5">
            <button
              className=" bg-gradient-to-t border-2 border-[#016604] text-white text-[22px] font-raleway italic font-semibold rounded-3xl p-2"
              onClick={() => {
                onCancel();
                onConfirm(name, color);
              }}
            >
              Confirm
            </button>
            <button
              className=" bg-gradient-to-t border-2 border-[#63010e] text-white text-[22px] font-raleway italic font-semibold rounded-3xl p-2"
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default WorkspaceButtonOver;
