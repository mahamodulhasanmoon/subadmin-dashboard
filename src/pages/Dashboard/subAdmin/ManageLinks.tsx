

import toast from "react-hot-toast";
import { postData } from "../../../api/fetching";
import { useForm } from "react-hook-form";
import { categoryLinkArr, linksTypeArr } from "../../../data/data";



export default function ManageLinks() {
    const { handleSubmit, register } = useForm<any>();

    const onSubmit = async (data:any) => {
        try {
          const response = await postData("sites", data)
          toast.success((response as any).message)
        } catch (error) {
          console.log((error as any).message)
        }
    
    
      };
    return (
        <div>
            <div className="rounded-sm border  border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <form className="text-center flex items-center justify-center" onSubmit={handleSubmit(onSubmit)} >
            <div className="w-full max-w-[600px] flex text-center flex-col gap-5.5 p-6.5">
             <div>
             <div className="text-start">
                <label className="mt-3 block text-black dark:text-white">
                  Sites URL
                </label>
                <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="text"
                placeholder="Ex:( https://example.com)"

                  {...register('siteUrl')}
                />

                {/* gender */}
                <label className="mt-3 block text-black dark:text-white">
                 Sites
                </label>
                <select
      className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      {...register('sites')}
    >
              <option disabled selected>
          choose one
        </option>
      {
      linksTypeArr?.map((option:any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>


{/* Link Types */}

<label className="mt-3 block text-black dark:text-white">
                 Category
                </label>
                <select
      className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      {...register('category')}
    >
              <option disabled selected>
          choose one
        </option>
      {
      categoryLinkArr?.map((option:any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>


<button className="inline-flex rounded items-center my-5 w-full justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10">Create New Links</button>
              </div>

             </div>

            </div>
          </form>
        
            </div>
   
        </div>
    )
}
