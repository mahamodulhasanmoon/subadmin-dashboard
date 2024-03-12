import { useContext, useEffect, useState } from "react";
import { categoryLinkArr, linksTypeArr } from "../../data/data";
import { getData } from "../../api/fetching";
import { handleCopyClick } from "../../utils/copyToClipboard";
import { AuthContext } from "../../Contexts/AuthProvider";
import Loader from "../../common/Loader";


const WebTable = () => {
  const { user, role } = useContext(AuthContext)
  const [selectedValue, setSelectedValue] = useState<String>(linksTypeArr[0].value)
  const [selectedCategory, setSelectedCategory] = useState<String>(categoryLinkArr[0].value)
  const [links, setLinks] = useState<[]>([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{} | null>(null)

  const { plans } = user;
  let siteCond: any;
  useEffect(() => {
    const fetchData = async () => {


      const result = plans.find((plan: any) =>
        plan.site.toLowerCase() === selectedValue.toLowerCase() && plan.category.includes(selectedCategory)
      );

      setStatus(result);

      setLoading(true)
      try {
        const data = await getData(`sites?sites=${selectedValue}&category=${selectedCategory}`);
        setLinks((data as any)?.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false)
      }
    };

    fetchData();
  }, [selectedValue, selectedCategory]);


  return (
    <div className="  rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Website Urls
      </h4>
      <div className="buttons my-5 flex items-center justify-center gap-2 flex-wrap text-center">


        {
          linksTypeArr.map(({ label, value }, index) => (
            <button key={index} className={`inline-flex rounded items-center px-10 justify-center   py-2 text-center font-medium hover:bg-opacity-90 ${value === selectedValue ? 'text-white bg-primary' : 'text-stroke bg-body'}`} value={value}
              onClick={() => (setSelectedValue(value))}
            >{label}</button>
          ))
        }

      </div>

      <div className="buttons my-5 flex items-center justify-center gap-2 flex-wrap text-center">


        {
          categoryLinkArr.map(({ label, value }, index) => (
            <button key={index} className={`inline-flex rounded items-center justify-center  px-2 py-1 text-center font-medium hover:bg-opacity-90 ${value === selectedCategory ? 'text-white bg-primary' : 'text-stroke bg-body'}`} value={value}
              onClick={() => (setSelectedCategory(value))}
            >{label}</button>
          ))
        }

      </div>

      {
        loading && (
          <div>
            <Loader />
          </div>
        )
      }

      <div className="flex flex-col">
        <div className="grid grid-cols-12 rounded-sm bg-gray-2 dark:bg-meta-4 ">
          <div className="p-2.5 text-center xl:p-5 col-span-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Pages
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-8">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Website
            </h5>
          </div>

          <div className="p-2.5 text-center xl:p-5 col-span-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>


        </div>

        {

          links?.map(({ category, _id, siteUrl, sites }:any, i) => {
            const splitUrl = siteUrl.split("invite/");

            // The middle part is the second element in the array (index 1)
            const finalCat = splitUrl[1];
           
            if (role !== 'subadmin') {
              if (i <= 2 && (status as any)?.status === 'trial') {
                siteCond = `${siteUrl}?id=${user?.id}`
              }

              else if (i > 2 && (status as any)?.status === 'trial') {
                siteCond = 'paid'
              } else if ((status as any)?.status === 'expired') {
                siteCond = `expired`

              } else if (!(status as any)?.category.includes(selectedCategory)) {
                siteCond = `Only For Paid Plans`
              } else {
                siteCond = `${siteUrl}?id=${user?.id}`
              }
            } else {
              siteCond = `${siteUrl}?id=${user?.id}`
            }
            return (
              <div key={_id} className="grid grid-cols-12 border-b border-stroke dark:border-strokedark ">
                <div className="flex items-center justify-center p-2.5 xl:p-5 col-span-2">
                  <p className="text-black dark:text-meta-5 font-bold text-lg">{sites}/{finalCat? finalCat : category}</p>
                </div>
                <div className="flex items-center gap-3 p-2.5 xl:p-5 col-span-8">

                  <p className="hidden text-black dark:text-white sm:block">{siteCond}
                  </p>
                </div>



                <div className="flex items-center justify-center p-2.5 xl:p-5 col-span-2">
                  <button
                    onClick={() => handleCopyClick(`${siteUrl}?id=${user?.id}`)}
                    disabled={`${siteUrl}?id=${user?.id}` != siteCond}

                    className={`inline-flex rounded items-center justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10 ${siteCond != `${siteUrl}?id=${user?.id}` && 'disabled:bg-body disabled:cursor-not-allowed'} `}
                  >
                    Copy
                  </button>
                </div>


              </div>
            )
          })
        }




      </div>
    </div>
  );
};

export default WebTable;
