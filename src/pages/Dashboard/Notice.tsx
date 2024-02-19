import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteData, getData, postData } from "../../api/fetching";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formatUtcToLocal } from "../../utils/DateFormater";
import { AuthContext } from "../../Contexts/AuthProvider";

export interface INotification {
  title: string,
  description: string,
  updatedAt?: string,
  _id: string
}

export default function Notice() {
  const { role } = useContext<any>(AuthContext)

  const [notifications, setNotifications] = useState<INotification[]>([])
  const [isForm, setIsForm] = useState(false)

  const { handleSubmit, register } = useForm<INotification>();

  const onSubmit = async (data: INotification) => {
    try {
      const response = await postData("notices", data)
      toast.success((response as any).message)
      setIsForm(false)
    } catch (error) {
      console.log((error as any).message)
    }


  };
  const handleDelete = async (id: String) => {
    try {
      const response = await deleteData(`notices/${id}`)
      toast.success((response as any).message)
      setIsForm(false)
    } catch (error) {
      console.log((error as any).message)
    }


  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`notices`);
        setNotifications((data as any)?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="px-4.5 py-3 flex items-center justify-between">
        <h5 className="text-xl font-medium text-bodydark2">Notification</h5>
        {/* create Button */}
        <div className="flex items-center justify-center">
          {
            role && role === 'subadmin' && (
              <button
                onClick={() => setIsForm((state) => !state)}
                className="inline-flex rounded items-center justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10">Create New Notice</button>
            )
          }

        </div>
      </div>
      {
        isForm && role === 'subadmin' && (
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Title
                </label>
                <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" type="text"

                  {...register('title')}
                />
                <label className="mb-3 block text-black dark:text-white">
                  Enter Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Default textarea"
                  {...register('description')}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

              <button className="inline-flex rounded items-center justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10">Update</button>

            </div>
          </form>
        )
      }


      <ul className="flex h-auto flex-col overflow-y-auto">
        {
          (notifications.length > 0) ? notifications?.map(({ title, description, updatedAt, _id }, index) => (
            <li key={index}>
              <Link
                className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                to="#"
              >
                <p className="text-lg">
                  <span className="text-black dark:text-meta-3 font-bold">
                    {title}
                  </span>{' '}
                  {description}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-meta-5">{formatUtcToLocal(updatedAt)}</p>
                  <div className="flex items-center justify-center gap-3">
                    {
                      role === 'subadmin' && (
                        <>
                          <button className="text-meta-3">Edit</button>
                          <button onClick={() => handleDelete(_id)} className="text-meta-1">Delete</button>
                        </>
                      )
                    }

                  </div>
                </div>
              </Link>
            </li>
          ))
            :

            (
              <h2 className='text-center text-2xl mt-12 font-bold dark:text-bodydark1'> No notification Found</h2>
            )

        }




      </ul>

    </div>
  )
}
