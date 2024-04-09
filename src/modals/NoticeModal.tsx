import {  useState } from "react";
import { Link } from "react-router-dom";



export default function NoticeModal() {

    const [showModal, setShowModal] = useState(true)


    return (
        <>

            {showModal ? (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-99">
                        <div className="bg-form-strokedark rounded shadow-lg p-6 w-1/2  backdrop-blur-md">
                            <h2 className="text-center text-2xl font-bold text-danger mb-5">আপডেটের কাজের জন্য ২৪ ঘন্টা এই ড্যাশবোর্ড এর কাজ চলতেছে</h2>
                            <hr />
                       
                            <p className="text-success text-xl my-5">দয়া করে কাজ অব্যাহত রাখতে আমাদের বেকাপ ড্যাশবোর্ড এ ফ্রি সাইন আপ করে নিন</p> <br />
                            <p className="text-success  text-center">Free Signup করতে এই বাটনে <a 
                             className="btn btn-sm ms-3 bg-meta-1 text-white" href="https://sadata.cloud"> ক্লিক করুন</a> </p>
                        
                        </div>
                        
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    
                </>
            ) : null}
        </>
    );
}