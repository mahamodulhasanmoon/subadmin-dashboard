import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
const OverviewCard = ({item}:any) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
       
        <item.icon className="fill-meta-1"/>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {item.total}
          </h4>
          <span className="text-sm font-medium">{item?.title}</span>
        </div>

        <span className={
          ` ${
            item.overviewInPercent > 0
              ? "text-meta-3"
              : item.overviewInPercent < 0
              ? "text-meta-1"
              : "text-meta-9"
          }
         flex items-center gap-1 text-sm font-medium`}>
           {item.overviewInPercent}%
          
          
          
            {
              item.overviewInPercent > 0
                ? <BiUpArrowAlt/>
                : item.overviewInPercent < 0
                ? <BiDownArrowAlt/>
                : ' '
            }
          

        </span>
      </div>
    </div>
  );
};

export default OverviewCard;
