import { MdDriveFileRenameOutline } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";

const WrkSpDropDown = ({ isOpen, onDeleteSent }) => {
  const [isShowing, setIsShowing] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    setIsShowing(isOpen);
  }, [isOpen]);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsShowing(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    isShowing && (
      <div className="absolute top-[84px] left-16 w-auto h-auto" ref={menuRef}>
        <ul className="flex flex-col bg-slate-200 rounded-tr-3xl rounded-bl-3xl">
          <li
            className=" p-5 flex text-center font-raleway text-[18px] hover:bg-lime-400 hover:rounded-tr-3xl"
            onClick={() => {
              console.log("yes ");
            }}
          >
            <MdDriveFileRenameOutline size={25} className="mr-4" />
            Rename
          </li>
          <li
            className=" p-5 flex text-center  font-raleway text-[18px]  hover:bg-lime-400 hover:rounded-bl-3xl"
            onClick={() => {
              onDeleteSent();
              setIsShowing(false);
            }}
          >
            <CiTrash size={25} className="mr-4" />
            Delete
          </li>
        </ul>
      </div>
    )
  );
};

export default WrkSpDropDown;
