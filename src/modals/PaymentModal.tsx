import { useContext,  useState } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { useForm } from "react-hook-form";
import { postData } from "../api/fetching";
import toast from "react-hot-toast";
import { categoryLinkArr, linksTypeArr } from "../data/data";
import { handleCopyClick } from "../utils/copyToClipboard";

interface ISubscription {
  site: string;
  category: string;
}
export default function PaymentModal() {
  const { user } = useContext(AuthContext)
  const { showModal, setShowModal } = useContext(AuthContext)
  const { handleSubmit, register } = useForm<ISubscription>();
  const [checkedItems, setCheckedItems] = useState<any>([]);

  // const [amount,setAmount] = useState<any>(0);

  // useEffect(()=>{
  //   setAmount(checkedItems.length * 500)
  // },[checkedItems])

  const handleCheckboxChange = (event:any) => {

    const { value } = event.target;
   
    if (checkedItems?.includes(value)) {
       setCheckedItems(checkedItems?.filter((item:any) => item !== value));
    } else {
       setCheckedItems([...checkedItems, value]);
    }
   };

  const onSubmit = async (data: ISubscription) => {
    try {
      const originalData = {
        ...data,
        userId: user._id,
        // amount:amount,
        category:checkedItems
      }
      console.log(originalData);
      const response = await postData("orders/request", originalData)
      toast.success((response as any).message)
      setShowModal(false)
    } catch (error) {
      console.log((error as any).message)
    }
  }


  return (
    <>

      {showModal ? (
        <>
          <div
            className="justify-center z-999 items-center flex overflow-x-hidden  fixed top-10 inset-0  outline-none focus:outline-none max-h-[90vh] overflow-y-auto pt-39"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-black bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-2xl text-black font-semibold">
                    Renuew Your Account
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 flex-auto">


                  <p className="my-4 text-success text-lg leading-relaxed">
                   সফলভাবে সাবস্ক্রিপশন গ্রহণ করতে নিচের ফর্মটি পূরণ করুন।
                  </p>
                </div>

                {/* Balance Information Form */}
                <form onSubmit={handleSubmit(onSubmit)} >
                  <div className="flex flex-col gap-5.5 px-6.5 py-2">
                    <div>


                      {/* websitess */}
                      <label className="mb-3 block text-2xl dark:text-white text-red-500 fonr-bold mt-1">
                        Select Your Websites
                      </label>

                      <select
                        className="w-full rounded-lg block border-[1.5px] border-stroke bg-bodydark1 py-3 px-5 outline-none transition text-black font-bold focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                        {...register('site')}
                       
                      >
                        <option disabled selected>
                          choose one
                        </option>
                        {
                          linksTypeArr?.map((option: any) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </select>

{/* Select Multiple Type */}

<label className="mb-3 block text-2xl dark:text-white text-red-500 fonr-bold mt-1">
                        Select Your Plan
                      </label>
<div className="grid grid-cols-2 gap-10 items-center">
<div>


                      {
 categoryLinkArr?.map((option: any) => (
    <div key={option.value}
    className="flex items-center  text-xl font-bold"
    >
      <input
        className="w-5 h-5"
        type="checkbox"
        value={option.value}
        checked={checkedItems.includes(option.value)}
        onChange={handleCheckboxChange}
      />
      <label  className=" dark:text-white pl-4 py-2">{option.label}</label>
    </div>
  ))
}
</div>
<div>
{/* <h2 className="text-4xl text-success text-center font-bold">{amount} Taka</h2> */}
</div>
</div>



               

{/* <div className="relative px-6 flex-auto">
                  <p className="my-4 text-success font-bold text-center text-lg leading-relaxed">
                    আপনার একাউন্ট ১ মাসের জন্য সাবস্ক্রিপশন নিতে {amount} টাকা নিচের  নাম্বারে  টাকা সেন্ডমানি করুন।
                  </p>

                </div> */}

                {/* <ul className="mb-4">
                  <li>
                    <h3 className="text-xl font-bold  dark:text-white py-1 text-center ">Bkash: 01326194562</h3>
                  </li>
                  <li>
                    <h3 className="text-xl font-bold  dark:text-white py-1 text-center ">Nagad: 01326194562</h3>
                  </li>
                </ul> */}







                      <label className="mb-3 block text-success font-bold fonr-bold mt-1">
                       Admin Skype Contact For Get Premium Access
                      </label>
                      <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-bodydark1 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary  :dark:text-white dark:bg-black" type="text" placeholder="" value={'live:.cid.c17044662b5bfaa3'} 
                      onClick={()=> handleCopyClick(`live:.cid.c17044662b5bfaa3`)}

                        // {...register('paymentNumber')}
                      />
                      {/* <label className="mb-3 block text-[#ff0000] fonr-bold mt-1">
                        পেমেন্ট মেথড
                      </label> */}
                      {/* <select
                        className="w-full rounded-lg block border-[1.5px] border-stroke bg-bodydark1 py-3 px-5 outline-none transition text-black font-bold focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                        {...register('paymentMethod')}
                      >
                        <option disabled selected>
                          choose one
                        </option>
                        <option value='Bkash'>
                          Bkash
                        </option>
                        <option value='nagad'>
                          Nagad
                        </option>

                      </select> */}
                      {/* <label className="mb-3 block text-[#ff0000] font-bold mt-1">
                        TRX ID
                      </label> */}
                      {/* <input className="w-full rounded-lg block border-[1.5px] border-stroke bg-bodydark1 py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter " type="text" placeholder="ট্রানজেকশন আইডি টি দিন"

                        {...register('trxId')}
                      /> */}

                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-[#ff0000] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-success text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Request For Premium
                      </button>
                    </div>



                  </div>
                </form>
                {/*footer*/}

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}