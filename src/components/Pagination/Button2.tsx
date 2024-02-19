export default function Button2({ content, onClick, active, disabled }:any) {
    return (
      <button
        className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
        ${active ? "bg-red-500 text-white" : "text-red-500"}
        ${
          !disabled
            ? "bg-primary hover:bg-success hover:text-white"
            : "text-white bg-primary cursor-not-allowed"
        }
        `}
        onClick={onClick}
        disabled={disabled}
      >
        {content}
      </button>
    );
  }