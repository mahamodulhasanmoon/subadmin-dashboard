
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { postData } from "../../api/fetching";




export default function ManageSocials() {
    const { handleSubmit, register } = useForm<any>();

    const onSubmit = async (data: any) => {
        try {
            const response = await postData("sociallinks", data)
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
                                    Name
                                </label>
                                <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="text"
                                    placeholder="Ex: (Text Now)"

                                    {...register('name')}
                                />

<label className="mt-3 block text-black dark:text-white">
                                    Icon Url
                                </label>
                                <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="text"
                                    placeholder="Ex: (https://i.ibb.co/SvXrVwh/textplus.png)"

                                    {...register('iconUrl')}
                                />
<label className="mt-3 block text-black dark:text-white">
                                    Social Links
                                </label>
                                <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="text"
                                    placeholder="Ex: (https://facebook.com)"

                                    {...register('socialLink')}
                                />
<label className="mt-3 block text-black dark:text-white">
                                    Price
                                </label>
                                <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="number"
                                    placeholder="Ex: (300)"

                                    {...register('price')}
                                />






                                <button className="inline-flex rounded items-center my-5 w-full justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10">Create Service</button>
                            </div>

                        </div>

                    </div>
                </form>

            </div>

        </div>
    )
}
