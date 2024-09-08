import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthProvider';
import { postData } from '../../api/fetching';
import toast from 'react-hot-toast';

type FormData = {
  domain: string;
  paymentNumber: string;
  trxID: string;
};

export default function NewShortReq() {
  const {user }= useContext(AuthContext)
  console.log(user);

  const [price] = useState(1200); // Base price in BDT
  const [totalPrice, setTotalPrice] = useState(price);
  const [loading, setLoading] = useState(false);

  const domainPrices: any = {
    com: 1000,
    net: 1200,
    org: 3000,
    io: 300,
    tech: 250,
    xyz: 200,
  };

  const { register, handleSubmit, watch, reset } = useForm<FormData>();
  const domainValue = watch('domain');

  const handleDomainChange = async () => {
    // Extract domain extension
    const domainParts = domainValue?.split('.');
    const extension: string = domainParts[domainParts?.length - 1] || '';
    const additionalPrice: any = domainPrices[extension.toLowerCase()] || 300;


    if (extension) {
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

  // Watch the domain field for changes
  React.useEffect(() => {
    handleDomainChange();
  }, [domainValue]);

  const onSubmit = async(data: FormData) => {

    const response:any = await  postData('/shortlinks/request',{
      ...data,
      totalPrice,
      user:user?._id,
    })
    if(response.success){
      toast.success("Successfully submitted Request")
      reset()
    };

  };

  return (
    <div className="p-6 max-w-lg mx-auto rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-danger">Domain Registration Form</h1>
      <div>
        <p className="text-lg font-semibold text-danger">Total Price: {loading ? 'Calculating...' : `${totalPrice} BDT`}</p>
      </div>
      <h4 className='text-danger font-semibold my-10'>কাস্টম ডোমেইন দিয়ে শর্টনার নেওয়ার জন্য অবশ্যই ফরমটি পুরন করুন এবং সেন্ড মানি করুন নিচের নাম্বারে</h4>
      <h4 className='text-danger font-semibold my-10'>01326194562 (নগদ / বিকাশ) পারসোনাল</h4>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="domain" className="block text-gray-700 font-medium mb-2">Domain Name:</label>
          <input
            type="text"
            id="domain"
            {...register('domain', { required: true })}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
        <div>
        <p className="text-lg font-semibold text-danger">Total Price: {loading ? 'Calculating...' : `${totalPrice} BDT`}</p>
      </div>
          <label htmlFor="paymentNumber" className="block text-gray-700 font-medium mb-2">Payment Number:</label>
          <input
            type="text"
            id="paymentNumber"
            {...register('paymentNumber', { required: true })}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="trxID" className="block text-gray-700 font-medium mb-2">Transaction ID:</label>
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
