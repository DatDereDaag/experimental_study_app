const WorkspaceButton = ({ wrkSpName, wrkSpColor }) => {
  return (
    <div className="relative p-3 w-[250px]">
      <div className="h-12 relative rounded-t-xl bg-slate-200 text-black font-serif text-l text-center italic font-light tracking-wider ">
        {wrkSpName}
      </div>
      <div
        className="rounded-b-xl h-[180px]"
        style={{ backgroundColor: `#${wrkSpColor}` }}
      >
        Image
      </div>
    </div>
  );
};

export default WorkspaceButton;
