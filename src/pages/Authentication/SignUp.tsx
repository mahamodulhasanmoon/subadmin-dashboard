import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { postData } from '../../api/fetching';

const SignUp = () => {
  const { handleSubmit, register } = useForm<any>();
  const navigate = useNavigate()
  const onSubmit = async (data:any) => {
      try {
        const response = await postData("auth/signup", data)
        toast.success((response as any).message)
        navigate('/signin')
      } catch (error) {
        console.log((error as any).message)
      }
  
  
    }
  return (
    <>      <div className="rounded-sm  min-h-[101vh] m-0 p-0  text-white shadow-default bg-black">
    <div className="flex flex-wrap items-center justify-center">


      <div className="w-full flex items-center  xl:w-1/2 ">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <h2 className="mb-9  text-center text-2xl font-bold text-white dark:text-white sm:text-title-xl2">
           Wellcome To Update Links
          </h2>
          <span className="mb-5 block font-medium text-center">Login System For Premium Account</span>



          <form className="text-center flex items-center justify-center" onSubmit={handleSubmit(onSubmit)} >
            <div className="w-full max-w-[600px] flex text-center flex-col gap-5.5 p-6.5">
             <div>
             <div className="text-start">
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


<button className="inline-flex rounded items-center my-5 w-full justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10">Create New User</button>
              </div>

             </div>

            </div>
          </form>



<div>

<p className='text-center  mt-5'>Already Have an Account? <Link className='text-primary' to='/signin'>Login Here</Link>
  </p>
</div>
        </div>
      </div>
    </div>
  </div>

    </>
  );
};

export default SignUp;
