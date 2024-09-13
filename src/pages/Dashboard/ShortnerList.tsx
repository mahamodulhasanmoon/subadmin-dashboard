import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import { getData } from "../../api/fetching";

type ShortenerData = {
  _id: string;
  user: string;
  domain: string;
  paymentNumber: string;
  trxID: string;
  totalPrice: number;
  status: string;
  createdAt: string;
};

export default function ShortnerList() {
  const { user } = useContext(AuthContext);
  const [shortData, setShortData] = useState<ShortenerData[]>([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response:any = await getData(`shortlinks/request?user=${user._id}`);
        setShortData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchData();
  }, [user._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shortener URLs List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Domain</th>
              <th className="border border-gray-300 px-4 py-2">Payment Number</th>
              <th className="border border-gray-300 px-4 py-2">Transaction Screenshot</th>
              <th className="border border-gray-300 px-4 py-2">Total Price (USD)</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {shortData.map((data, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{data.domain}</td>
                <td className="border border-gray-300 px-4 py-2">{data.paymentNumber}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <a href={data.trxID} target="_blank" rel="noopener noreferrer">
                    <img src={data.trxID} alt="Transaction Screenshot" className="h-16 w-16 object-cover" />
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">{data.totalPrice.toFixed(2)}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    data.status === 'approved'
                      ? 'text-green-600'
                      : data.status === 'pending'
                      ? 'text-yellow-500'
                      : 'text-red-600'
                  }`}
                >
                  {data.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(data.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
