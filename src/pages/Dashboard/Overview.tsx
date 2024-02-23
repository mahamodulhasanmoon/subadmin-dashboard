

import { useContext, useEffect, useState } from 'react';
import BalanceCard from '../../components/BalanceCard.tsx';
import OverviewCard from '../../components/OverviewCard.tsx';

import ConversionTable from "../../components/tables/ConversionTable.tsx";
import useInformation from "../../hooks/useInformation.ts";
import { getData } from '../../api/fetching.ts';
import { AuthContext } from '../../Contexts/AuthProvider.tsx';


const Overview = () => {
  const {user}= useContext(AuthContext)
  const [balance,setBalance]= useState<any>(null)
  const {clickData}= useInformation({route:'/overview'})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data:any = await getData(`balance?createdBy=${user?._id}`);
        setBalance(data );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
{
  user?.role==='subadmin'&& (
    <>
    <h2 className='text-center text-3xl font-bold mb-8'>Overview In {balance?.monthName} Month</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      <BalanceCard
      title='total Users'
      amount={(balance as any)?.totalUser}
      /> 
      <BalanceCard 
              title='total Sells'
              amount={(balance as any)?.totalSell}
      /> 
      <BalanceCard
        title='Admin Charge'
        amount={(balance as any)?.adminAmount}
      /> 
     

    </div>
    </>
  )
}

      <div className="grid grid-cols-1 mt-8 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {
          clickData?.map((item,i) =>  <OverviewCard key={i} item={item} /> )
        }

      </div>

      <div className="my-5">

        <ConversionTable/>
        
      </div>

    </>
  );
};

export default Overview;
