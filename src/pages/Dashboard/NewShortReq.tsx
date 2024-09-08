import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider';
import { postData } from '../../api/fetching';
import toast from 'react-hot-toast';
import InputField from '../../components/forms/InputField';

type FormData = {
  domainName: string;
  extension: string;
  paymentNumber: string;
  trxID: string;
};

export default function NewShortReq() {
  const { user } = useContext(AuthContext);

  const [price] = useState(12); // Base price in USD
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
      <h1 className="text-2xl font-bold mb-4 text-danger">Domain Registration Form</h1>
      <div>
        <p className="text-lg font-semibold text-danger">
          Total Price: {loading ? 'Calculating...' : `${totalPrice.toFixed(2)} USD`}
        </p>
      </div>
      <h4 className="text-danger font-semibold my-10">
        কাস্টম ডোমেইন দিয়ে শর্টনার নেওয়ার জন্য অবশ্যই ফরমটি পুরন করুন এবং সেন্ড মানি করুন নিচের Link এ
      </h4>
      <div className='my-5'>
        <span><InputField email={'THieNjvL66a7k8mnRqXozCAoH5CxA17WDx'} userId={user._id}/></span> <span className='mx-5 text-xl text-success font-bold'>Only TRON (TRC20) </span>
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
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="extension" className="block text-gray-700 font-medium mb-2">
            Domain Extension:
          </label>
          <select
            id="extension"
            {...register('extension', { required: true })}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">Select domain extension</option>
            {validExtensions.map(ext => (
              <option key={ext} value={ext}>
                {`.${ext}`}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div>
          <label htmlFor="paymentNumber" className="block text-gray-700 font-medium mb-2">
            Payment Number:
          </label>
          <input
            type="text"
            id="paymentNumber"
            {...register('paymentNumber', { required: true })}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
