import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import CountComp from './CountComp';



function Status() {

  const { user,setShowModal,status,subscription } = useContext(AuthContext);
  const [countdown, setCountdown] = useState<React.ReactNode>('00 days : 00 hours : 00 minutes : 00 seconds');

  useEffect(() => {
    const userData = user;
    const { plans } = userData || {};

    if (plans) {

      const trialData = subscription.reduce((latestPlan:any, currentPlan:any) => {
        if (currentPlan.status === 'trial' && (!latestPlan || new Date(currentPlan.endDate).getTime() > new Date(latestPlan.endDate).getTime())) {
            return currentPlan;
        } else {
            return latestPlan;
        }
    }, null);


  

      // check my plan lists and permissions

      if (trialData?.status === 'trial') {
        const currentDate = new Date();
        const endDateTime = new Date(trialData.endDate || '');

        // Calculate initial timeLeft
        let timeLeft = endDateTime.getTime() - currentDate.getTime();

        // Update countdown every second
        const intervalId = setInterval(() => {
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

          const formattedTime = (

            <CountComp
              hours={hours}
              days={days}
              minutes={minutes}
              seconds={seconds}
            />
          );

          setCountdown(formattedTime);

          if (timeLeft <= 0) {
            clearInterval(intervalId);
            setCountdown(

              <CountComp
                hours={'00'}
                days={'00'}
                minutes={'00'}
                seconds={'00'}
              />
            );
          }

          timeLeft -= 1000;
        }, 1000);

        // Cleanup interval on component unmount
        return () => {
          clearInterval(intervalId);
        };
      }
    }
  }, [user]);

  const renderContent = () => {
    if ( status === 'trial') {
      return (
        <div>
          <div className='flex items-center gap-10'>

            <p>{countdown} </p>
            <button 
          onClick={() => setShowModal(true)}
          disabled={!user?.isActive}
          className={`bg-[#ff0000] text-white py-1 px-3 mx-2 font-bold ${!user.isActive && 'disabled:cursor-not-allowed'}`}>Buy Primium</button>

          </div>
        </div>
      );
    } else if (status === 'expired') {
      return (
        <div>
           <div className='flex items-center justify-center'>
          <p>Account Validation has expired.</p> 
          <button 
          onClick={() => setShowModal(true)}
          className='bg-[#ff0000] text-white py-1 px-3 mx-2 font-bold'>Renuew Now</button>
          
        </div>


        </div>
       
      );
    } else {
      return (
        <div className='flex items-center justify-center'>
          <p className='text-[#ff0000] font-bold'>Your Account Is Now Under Review Please wait 2 to 12 hour</p>
          <button 
          onClick={() => setShowModal(true)}
          disabled={!user?.isActive}
          className={`bg-[#ff0000] text-white py-1 px-3 mx-2 font-bold ${!user.isActive && 'disabled:cursor-not-allowed'}`}>Buy Primium</button>
        </div>
      );
    }
  };

  return (
    <div className='flex items-center justify-center gap-5'>
      {/* <h1 className='text-[#2cb13c] font-bold text-xl'> {subscriptionStatus === 'trial' && 'Free Trial' || subscriptionStatus}</h1> */}
      {renderContent()}

    </div>
  );
}

export default Status;
