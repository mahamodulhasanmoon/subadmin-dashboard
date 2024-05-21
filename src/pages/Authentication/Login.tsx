import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CiLock, CiMail } from 'react-icons/ci';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextProps } from '../../Contexts/AuthProvider';
import { useForm } from 'react-hook-form';

interface LoginData{
    email: string;
    password: string;
  }

export default function Login() {
    const [verifyError,setVerifyError]= useState('')
    const [loading,setLoading]= useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
    const {handleLogin,user}:AuthContextProps = useContext(AuthContext)
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
          await handleLogin?.(data)
          setLoading(false)
          navigate('/verify_otp');
          return 
      } catch (error:any) {
        setLoading(false)
        console.log(error.response);
        if(error.response.data.error ==='Please Verify Your Account'){
         
            setVerifyError('please check Your Email We Sent A verify Mail')
        }
        toast.error(error.response.data.error || error.response.data.message);
      }
  
      
    };
  ;
  return (
    <>
         <form className='login_form' onSubmit={handleSubmit(onSubmit)}>
        <h1 className="big_heading">Sign in</h1>
       
        <div className="text-start w-full">
     
      
        <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <span className="absolute right-4 top-4">
            <CiMail/>
          </span>
        </div>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>


{/* password */}
<div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            placeholder="6+ Characters, 1 Capital letter"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <span className="absolute right-4 top-4">
            <CiLock/>
          </span>
        </div>
        {(errors as any).password && <p className="text-red-500">{(errors as any)?.password.message}</p>}
      </div>


      <div className="mb-5">
        <input
          type="submit"
          value={loading ? 'Loading...' : 'Login'}
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        />
      </div>
      </div>
      </form>
    </>
  )
}
