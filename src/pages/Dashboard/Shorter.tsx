import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { getData } from '../../api/fetching';
import { handleCopyClick } from '../../utils/copyToClipboard';
import toast from 'react-hot-toast';
import CompLoader from '../../common/Loader/CompLoader';
import axios from 'axios';
import ShortnerList from './ShortnerList';

export default function Shorter() {
  const [fullUrl, setfullUrls] = useState('');
  const [urls, setUrls] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const handleShortUrl = async () => {
    try {
      // await postData(`shortlinks`, {
      //   fullUrl: fullUrl,
      // });


      const encodedParams = new URLSearchParams();
encodedParams.set('url', fullUrl);

const options = {
method: 'POST',
url: 'https://spoo.me/',
headers: {
Accept: 'application/json'
},
data: encodedParams,
};

const response = await axios.request(options);

setUrls((prevUrls:any) => [...prevUrls, response?.data?.short_url])
console.log(response.data);

    
      toast.success('successfull');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(`shortlinks`);
        setUrls((data as any)?.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

        <h3 className="my-6 text-xl font-semibold text-black dark:text-white">
          Convert ShortURL
        </h3>

        {/* video  */}
        
        <div>
        {/* <ReactPlayer url='https://www.facebook.com/rk6862/videos/1430117184294439' controls /> */}
        <h2 className='flex gap-5 text-2xl  items-center mb-10'><span>check Video Tutorial</span> <Link to={`https://www.facebook.com/rk6862/videos/1430117184294439`}><button className='bg-primary px-6 py-2'> Click Here</button></Link></h2>
    
    </div>
    <ShortnerList/>

      {/* Shoerner  */}
        <div className="flex flex-col gap-5.5 p-6.5">
          <div className="flex">
          <select className='rounded-tl-lg rounded-bl-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary' name="" id="">
           
            <option value="https://spoo.me" selected>https://spoo.me</option>
            
          </select>
            <input
              type="text"
              onChange={(e) => setfullUrls(e.target.value)}
              placeholder="Paste Your Website URL"
              className="w-[60%]   border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />

            <button
              onClick={handleShortUrl}
              className="flex rounded-tr-lg rounded-br-lg items-center justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-3 xl:px-6"
            >
              Short url
            </button>
          </div>
        </div>

        {/* <FormElements/>   */}

        {/* short url Links Code Start */}
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Short Url Links
        </h4>

        <div className="flex flex-col">
          {/* <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Website
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Short URL
              </h5>
            </div>

            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Clicks
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div> */}

<div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
            {/* <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Website
              </h5>
            </div> */}
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Short URL
              </h5>
            </div>

            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {loading && (
            <div>
              <CompLoader />
            </div>
          )}
          {/* {urls?.map(({ fullUrl, shortUrl, clicks }, index) => (
            <div key={index} className="grid grid-cols-4 sm:grid-cols-4">
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <Link
                  to={fullUrl}
                  className="hidden text-black dark:text-white sm:block"
                >
                  {fullUrl}
                </Link>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <Link
                  to={`https://google.com?search=${shortUrl}`}
                  className="text-black dark:text-white"
                >
                  {shortUrl}
                </Link>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{clicks}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
               
                <button
                  onClick={() => handleCopyClick(`http://bit.ly/${shortUrl}`)}
                  className="inline-flex rounded items-center justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10"
                >
                  Copy
                </button>
              </div>
            </div>
          ))} */}

{urls?.map((val:any) => (
            <div key={val} className="grid grid-cols-2 sm:grid-cols-2">
             

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <Link
                  to={val}
                  className="text-black dark:text-white"
                >
                  {val}
                </Link>
              </div>

              

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                {/* button */}
                <button
                  onClick={() => handleCopyClick(val)}
                  className="inline-flex rounded items-center justify-center bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-5 xl:px-10"
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




