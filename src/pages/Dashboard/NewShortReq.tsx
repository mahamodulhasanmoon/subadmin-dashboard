import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider';
import { postData } from '../../api/fetching';
import toast from 'react-hot-toast';
import InputField from '../../components/forms/InputField';
import { handleCopyClick } from '../../utils/copyToClipboard';
import ReactPlayer from 'react-player';

type FormData = {
  domainName: string;
  extension: string;
  paymentNumber: string;
  trxID: string;
};

export default function NewShortReq() {
  const { user } = useContext(AuthContext);

  const [price] = useState(7); // Base price in USD
  const [totalPrice, setTotalPrice] = useState(price);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // For error handling

  const validExtensions = ['site', 'online', 'link','live','fun','cam']; // Define valid extensions

  const domainPrices: any = {
    site: 3,   // Prices in USD
    online: 3,
    link: 3,
    live: 3,
    fun: 3,
    cam: 3,
  };

  const { register, handleSubmit, watch, reset } = useForm<FormData>();
  const domainNameValue = watch('domainName');
  const extensionValue = watch('extension');

  const handleDomainChange = () => {
    if (!validExtensions.includes(extensionValue?.toLowerCase())) {
      setError('Invalid domain extension. Please select a valid one from the dropdown.');
      setTotalPrice(price); // Reset total price
      return;
    }

    const additionalPrice: any = domainPrices[extensionValue?.toLowerCase()] || 0;

    setError(null); // Clear error if the extension is valid

    if (extensionValue) {
      try {
        setLoading(true);

        // Update the total price
        setTotalPrice(price + additionalPrice);
      } catch (error) {
        console.error('Error fetching domain price:', error);
        setTotalPrice(price); // Fallback to base price if there's an error
      } finally {
        setLoading(false);
      }
    }
  };

  // Watch the domain fields for changes
  React.useEffect(() => {
    handleDomainChange();
  }, [domainNameValue, extensionValue]);

  const onSubmit = async (data: FormData) => {
    if (error) {
      toast.error(error); // Show error if the domain is invalid
      return;
    }

    // Concatenate domain name and extension
    const fullDomain = `${data.domainName}.${data.extension}`;

    const response: any = await postData('/shortlinks/request', {
      ...data,
      domain: fullDomain, // Include the concatenated domain
      totalPrice,
      user: user?._id,
    });

    if (response.success) {
      toast.success('Successfully submitted Request');
      reset();
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto rounded-lg shadow-lg">
        {/* video  */}
        
        <div>
        <ReactPlayer  url='https://fb.watch/utK1GM0HKt' controls />
    
    </div>


      <h1 className="text-2xl font-bold mb-4 text-danger">Domain Registration Form</h1>
      <div className='text-success'>
        <p className="text-lg font-semibold ">
          Total Price: {loading ? 'Calculating...' : `${totalPrice.toFixed(2)} TRON (TRC20)`}
        </p>
      </div>
      <h4 className="text-danger font-semibold my-10">
      To obtain a shortener with a custom domain, please fill out the form and send the money via the link below.
      </h4>
      <div className='my-5'>

        {/* <span><InputField email={'THieNjvL66a7k8mnRqXozCAoH5CxA17WDx'} userId={user._id}/></span> <span className='mx-5 text-xl text-success font-bold'>Only TRON (TRC20) </span> */}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="domainName" className="block text-gray-700 font-medium mb-2">
            Domain Name (without extension):
          </label>
          <input
            type="text"
            id="domainName"
            {...register('domainName', { required: true })}
            className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder='type Domain Name Without Extension'
          />
        </div>
        <div>
          <label htmlFor="extension" className="block text-gray-700 font-medium mb-2">
            Domain Extension:
          </label>
          <select
            id="extension"
            {...register('extension', { required: true })}
            className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="">Select domain extension</option>
            {validExtensions.map(ext => (
              <option key={ext} value={ext}>
                {`.${ext}`}
              </option>
            ))}
          </select>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
        <div>
        <div>
          <label htmlFor="paymentNumber" className="m-5 text-xl text-success font-bold mb-5">
        Pay  USDT ${totalPrice.toFixed(2)}  -  TRON (TRC20)  
          </label>
          <input
            type="text"
            id="paymentNumber"
            {...register('paymentNumber', { required: true })}
            className="w-full rounded-lg mt-10  block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder='THieNjvL66a7k8mnRqXozCAoH5CxA17WDx'
            onClick={() => handleCopyClick('THieNjvL66a7k8mnRqXozCAoH5CxA17WDx')}
          />
        </div>
          <label htmlFor="paymentNumber" className="block text-gray-700 mt-5 font-medium mb-2">
         Dashboard  Email
          </label>
          <input
            type="text"
            id="paymentNumber"
            {...register('paymentNumber', { required: true })}
            className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder='email here'
          />
        </div>
        <div>
          <label htmlFor="trxID" className="block text-gray-700 font-medium mb-2">
            Transaction ID:
          </label>
          <input
            type="text"
            id="trxID"
            {...register('trxID', { required: true })}
            className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            placeholder=' Transaction ID:'
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
