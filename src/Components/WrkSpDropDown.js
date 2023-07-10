import { MdDriveFileRenameOutline } from "react-icons/md";
import { CiTrash } from "react-icons/ci";

const WrkSpDropDown = ({ isShowing }) => {
  return (
    isShowing && (
      <div className="absolute top-[84px] left-16 w-auto h-auto">
        <ul className="flex flex-col bg-slate-200 rounded-tr-3xl rounded-bl-3xl">
          <li
            className=" p-5 flex text-center font-raleway text-[18px] hover:bg-lime-400 hover:rounded-tr-3xl"
            onClick={(event) => {
              console.log("yes " + event);
            }}
          >
            <MdDriveFileRenameOutline size={25} className="mr-4" />
            Rename
          </li>
          <li
            className=" p-5 flex text-center  font-raleway text-[18px]  hover:bg-lime-400 hover:rounded-bl-3xl"
            onClick={(event) => {
              console.log("yes " + event);
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
