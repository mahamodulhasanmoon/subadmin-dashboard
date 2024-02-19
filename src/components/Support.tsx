

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "../api/fetching";

export default function Support() {
    const [sociallinks, setSocialLinks] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getData(`sociallinks`);
            setSocialLinks((data as any)?.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <div className=" my-8  rounded-sm border container mx-auto border-stroke bg-white px-5 py-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
               Buy  More Tools 
            </h4>

            <div className="tools">
                <div className="grid pb-8 lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-10">
                    {
                        sociallinks.length>0 && ( sociallinks.map((link:any,i)=>(
                            <div key={i} className="bg-whiter  border-2 border-success rounded-md">
                            <Link to={link?.socialLink}  target="_blank" rel="noopener noreferrer">
                                  <img src={link?.iconUrl} className="mt-1" alt="" />
                                  <p className="text-xl text-center px-4 py-1  font-bold text-success">{link?.price} ৳</p>
                              </Link>
                            </div>
                        )))
                    }


                </div>
            </div>

     {/*   <p className="text-xl font-bold my-10">For More Information  Contact with Admin</p>

<label htmlFor="Admin Skypee" className="font-bold text-success text-center text-xl flex justify-center mb-5">Admin Skypee</label>
<div className="py-5">
    <input type="text"  value={adminSkypee}  className="py-3 px-8 w-full cursor-pointer text-success font-bold text-center " onClick={()=>handleCopyClick(adminSkypee)} />
</div>
                 */}    

        </div>

     




    )
}
