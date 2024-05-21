import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';

import { AuthContext, AuthContextProps } from '../../Contexts/AuthProvider';
import toast from 'react-hot-toast';

interface LoginData{
  otpCode: string;
 
}
const VerifyOTP = () => {
  const [loading,setLoading]= useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const {handleLoginOTP,user,email}:AuthContextProps = useContext(AuthContext)
  const navigate = useNavigate()

    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    useEffect(()=>{
      if (user) {
        return navigate(from, { replace: true });
       }
   
    },[])

  const onSubmit = async (data:LoginData) => {
    try {
      setLoading(true)
        await handleLoginOTP?.({...data,email})
        setLoading(false)
      return navigate(from, { replace: true });
    } catch (error:any) {
      setLoading(false)
      toast.error(error.response.data.error || error.response.data.message);
    }

    
  };
;

  return (
    <>
      <div className="rounded-sm  min-h-[101vh] m-0 p-0  text-white shadow-default bg-black">
        <div className="flex flex-wrap items-center justify-center">


          <div className="w-full flex items-center  xl:w-1/2 ">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9  text-center text-2xl font-bold text-white dark:text-white sm:text-title-xl2">
               Wellcome To Update Links
              </h2>
              <span className="mb-5 block font-medium text-center">Account Verification Center</span>

              <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Enter Your OTP Code
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your OTP Code"
            {...register("otpCode", { required: "Email is required" })}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          
        </div>
        {errors.otpCode && <p className="text-red-500">{errors.otpCode.message}</p>}
      </div>


      <div className="mb-5">
        <input
          type="submit"
          value={loading ? 'verifying...' : 'Verify OTP Code'}
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        />
      </div>
    </form>
    <div>
      <p className='text-center'>Already Verified Account
      </p>

<p className='text-center  mt-5'>Back To <Link className='text-primary' to='/signin'>Login</Link>
      </p>
    </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
