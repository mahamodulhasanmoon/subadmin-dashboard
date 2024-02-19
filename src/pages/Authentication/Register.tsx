
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { postData } from '../../api/fetching';
import { useState } from 'react';

const Register = ({setIsSignUp}:any) => {
  const [loading,setLoading]= useState(false)
  const { handleSubmit, register } = useForm<any>();
  const onSubmit = async (data:any) => {
      try {
        setLoading(true)
        const response = await postData("auth/signup", data)
        toast.success((response as any).message)
        setLoading(false)
        setIsSignUp(false)
      } catch (error) {
        setLoading(false)
       toast.error((error as any).message)
      }
  
  
    }
  return (

<>
<form className="login_form" onSubmit={handleSubmit(onSubmit)}>
<h1 className="text-2xl font-bold">Create Account</h1>
<span className="spn">use your Real email for registration.  you Can not logged in without verify your Email adress</span>
<div className="text-start w-full">
        <label className="mt-3 block text-black dark:text-white">
          Name
        </label>
       
        <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="text"
        placeholder="Ex:( Jhon Doe)"

          {...register('name')}
        />
        {/* email */}
        <label className="mt-3 block text-black dark:text-white">
          Email Adress
        </label>
        <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="email"
        placeholder="Ex: (example@gmail.com)"

          {...register('email')}
        />
        {/* gender */}
        <label className="mt-3 block text-black dark:text-white">
          Gender
        </label>
        <select
className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
{...register('gender')}
>
<option value="male">Male</option>
<option value="female">Female</option>
</select>

{/* password */}
<label className="mt-3 block text-black dark:text-white">
         Password
        </label>
        <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="password"
        placeholder="password"

          {...register('password')}
        />


<button className="inline-flex rounded items-center my-5 w-full justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10">{loading ? 'Please Wait...' : 'Create New User'}</button>
      </div>
</form>
</>
  );
};

export default Register;
