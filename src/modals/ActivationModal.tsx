import { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { getData, updateData } from "../api/fetching";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function ActivationModal() {
    const { register, handleSubmit } = useForm();
const [isSent,setIsSent] = useState(false)
    const [loading,setLoading]= useState(false)
    const { user } = useContext(AuthContext)
    const [changeForm,setChangeForm] = useState(false)
    const [showModal, setShowModal] = useState(true)


const resendEmail = async ()=>{
    try {
        setLoading(true)
    const result:any = await getData(`auth/resend_mail?id=${user._id}`)

    if(result.success){
        toast.success(result.message)
        setIsSent(true)
    }
    setLoading(false)
    } catch (error:any) {
        toast.error(error.message)
    }
}

const onSubmit = async(data:any) => {
try {
    setLoading(true)
    const result:any = await updateData(`auth/change_mail_and_verify?id=${user._id}`, data)
    if(result.success) {
        toast.success(result.message)
        setLoading(false)
        setIsSent(true)
        setChangeForm(false)
    }
   
} catch (error:any) {
    toast.error(error.message)
}
 };
    return (
        <>

            {showModal ? (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-99">
                        <div className="bg-form-strokedark rounded shadow-lg p-6 w-1/2  backdrop-blur-md">
                            <h2 className="text-center text-2xl font-bold text-white mb-5">Please Verify Your Email Adress</h2>
                            <hr />
                          {
                            !changeForm && (
                                <div>

                                <div className="my-5">
                                    <h3 className="font-bold text-xl text-success text-center">Please check Your Email We Will Sent a Verified Email. And verify Your Account</h3>
                                </div>
                                <div className="text-center">
                                    <span>Can't get Email ? </span>
                                    {
                                        !isSent ? (
                                            <button className=" ml-3 rounded-sm gap-3.5 py-1 px-2 text-sm font-medium duration-300 ease-in-out text-white bg-[#ff0000] hover:bg-bodydark1 hover:text-black lg:text-base" onClick={resendEmail}> {loading ? 'Sending' : 'Resend'} </button>
                                        ) :(
                                            <button disabled className=" ml-3 rounded-sm gap-3.5 py-1 px-2 text-sm font-medium duration-300 ease-in-out text-white bg-success hover:bg-bodydark1 hover:text-black lg:text-base" > successfully Sent </button>
                                        )
                                    }
                                   

                                    <p className="font-bold text-xl">or</p>
                                    <button onClick={()=>setChangeForm(state=> !state)} className=" my-6 ml-3 rounded-sm gap-3.5 py-1 px-2 text-sm font-medium duration-300 ease-in-out text-white bg-success hover:bg-bodydark1 hover:text-black lg:text-base">change Email Adress</button>
    
                                </div>
    
                                </div>
                            )
                          }

                          
                            {
                                changeForm && (
                                    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4 w-2/3 mx-auto">
                                    <div className="relative"><input type="email" placeholder="Enter your email"  defaultValue={user?.email} className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                      {...register('email')}  /><span className="absolute right-4 top-4">
                                    </span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <button className="flex items-center my-6 text-center ml-3 rounded-sm gap-3.5 py-2 px-4 text-sm font-medium duration-300 ease-in-out text-white bg-success hover:bg-bodydark1 hover:text-black lg:text-base"> {loading ? 'sending ' : 'Change Email And Sent Verification'}</button>
                                    </div>
                                </div>

                            </form>
                                )
                            }
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}