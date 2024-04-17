// import { useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
export default function NidInfoModal({ isOpen, setIsOpen, data }: any) {


    return (
        <>

            {isOpen ? (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-99">
                        <div className="bg-form-strokedark rounded shadow-lg p-6 w-1/2  backdrop-blur-md" >
                            <div className="flex items-center justify-between">
                                <h2 className="text-center text-2xl font-bold text-white mb-5">NID Information</h2>
                                <h2 onClick={() => setIsOpen(false)} className="text-center text-2xl font-bold text-white bg-danger p-2 cursor-pointer mb-5">
                                    <IoCloseSharp />
                                </h2>

                            </div>
                            <hr />
                            <div >
                                <ul className='text-2xl'>
                                    <li className="my-2">NID Front: {data?.frontUrl}</li> <hr />
                                    <li className="my-2">Selfiee :{data?.imgUrl}</li> <hr />
                                    <li className="my-2">NID Back :{data?.cardNumber}</li> <hr />
                                    <li className="my-2">SSN :{data?.cardNumber}</li> <hr />
                                    

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