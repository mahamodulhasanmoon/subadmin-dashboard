import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider';
import { postData } from '../../api/fetching';
import axios from 'axios'; // For image upload
import toast from 'react-hot-toast';
import InputField from '../../components/forms/InputField';
import { handleCopyClick } from '../../utils/copyToClipboard';
import ReactPlayer from 'react-player';

type FormData = {
  domainName: string;
  extension: string;
  paymentNumber: string;
  screenshot: FileList; // For file upload
};

export default function NewShortReq() {
  const { user } = useContext(AuthContext);

  const [price] = useState(7); // Base price in USD
  const [totalPrice, setTotalPrice] = useState(price);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // For error handling
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Store uploaded image URL

  const validExtensions = ['site', 'online', 'link', 'live', 'fun', 'cam']; // Define valid extensions
  const domainPrices: any = {
    site: 3, online: 3, link: 3, live: 3, fun: 3, cam: 3,
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
    setTotalPrice(price + additionalPrice);
  };

  React.useEffect(() => {
    handleDomainChange();
  }, [domainNameValue, extensionValue]);

  // Function to handle image upload to ImageBB
  const uploadImageToImageBB = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const apiKey = 'cd0eadbffcc4159c7c95f11203ab9ee6'; // Replace with your ImageBB API key

    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
      const imageUrl = response.data.data.url;
      setImageUrl(imageUrl); // Store the image URL
      return imageUrl;
    } catch (error) {
      toast.error('Failed to upload the image. Please try again.');
      console.error('Image upload error:', error);
      return null;
    }
  };

  const onSubmit = async (data: FormData) => {
    if (error) {
      toast.error(error); // Show error if the domain is invalid
      return;
    }

    // Upload screenshot to ImageBB
    const file = data.screenshot[0];
    const uploadedImageUrl = await uploadImageToImageBB(file);

    if (!uploadedImageUrl) {
      return; // Stop the form submission if the image upload fails
    }

    // Concatenate domain name and extension
    const fullDomain = `${data.domainName}.${data.extension}`;

    const response: any = await postData('/shortlinks/request', {
      ...data,
      domain: fullDomain, // Include the concatenated domain
      trxID: uploadedImageUrl, // Use the uploaded image URL as the transaction ID
      totalPrice,
      user: user?._id,
    });

    if (response.success) {
      toast.success('Successfully submitted Request');
      reset();
      setImageUrl(null); // Reset image URL after successful submission
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto rounded-lg shadow-lg">
      {/* Video Section */}
      <div>
        <ReactPlayer url='https://fb.watch/utQbmvGpds' controls />
      </div>

      <h1 className="text-2xl font-bold mb-4 text-danger">Domain Registration Form</h1>
      <div className='text-success'>
        <p className="text-lg font-semibold">
          Total Price: {loading ? 'Calculating...' : `${totalPrice.toFixed(2)} TRON (TRC20)`}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="domainName" className="block text-gray-700 font-medium mb-2">
            Domain Name
          </label>
          <div className="flex w-full">
            <input
              type="text"
              id="domainName"
              {...register('domainName', { required: true })}
              className="w-full rounded-l-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary"
              placeholder="type domain"
            />
            <select
              id="extension"
              {...register('extension', { required: true })}
              className="w-[150px] rounded-r-lg block border-[1.5px] border-l-0 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary"
            >
              <option value="">extension</option>
              {validExtensions.map((ext) => (
                <option key={ext} value={ext}>{`.${ext}`}</option>
              ))}
            </select>
          </div>
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>

        <div>
          <label htmlFor="paymentNumber" className="m-5 text-xl text-success font-bold mt-5">
            Pay USDT ${totalPrice.toFixed(2)} - TRON (TRC20)
          </label>
          <input
            type="text"
            id="paymentNumber"
            className="w-full rounded-lg mt-5 block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none"
            placeholder='723995012'
            onClick={() => handleCopyClick('723995012')}
          />
        </div>
        <div>
          <label htmlFor="paymentNumber" className="block text-gray-700 font-medium mb-2">
            Skypee URL
          </label>
          <input
            type="text"
            id="paymentNumber"
            {...register('paymentNumber', { required: true })}
            className="w-full rounded-lg mt-5 block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none"
            placeholder='Skypee URl'
          
          />
        </div>

        <div>
          <label htmlFor="screenshot" className="block text-gray-700 font-medium mb-2">
            Upload Payment Screenshot
          </label>
          <input
            type="file"
            id="screenshot"
            {...register('screenshot', { required: true })}
            className="w-full rounded-lg block border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-dark"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
