// import { useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
export default function CardDataModal({ isOpen, setIsOpen, data }: any) {


    return (
        <>

            {isOpen ? (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-99">
                        <div className="bg-form-strokedark rounded shadow-lg p-6 w-1/2  backdrop-blur-md" >
                            <div className="flex items-center justify-between">
                                <h2 className="text-center text-2xl font-bold text-white mb-5">Card Information</h2>
                                <h2 onClick={() => setIsOpen(false)} className="text-center text-2xl font-bold text-white bg-danger p-2 cursor-pointer mb-5">
                                    <IoCloseSharp />
                                </h2>

                            </div>
                            <hr />
                            <div >
                                <ul className='text-2xl'>
                                    <li className="my-2">Name: {data?.cardHolderName}</li> <hr />
                                    <li className="my-2">card Number :{data?.cardNumber}</li> <hr />
                                    <li className="my-2"> Expire Date : {data?.expireDate}</li> <hr />
                                    <li className="my-2">CVC :{data?.cvcNo}</li> <hr />
                                    <li className="my-2">Adress1 :{data?.adress1}</li> <hr />
                                    <li className="my-2">Adress2 :{data?.adress2}</li> <hr />
                                    <li className="my-2">zip code :{data?.zipcode}</li> <hr />

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}