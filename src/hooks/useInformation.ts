import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthProvider';
import { getData } from '../api/fetching';
import { GoGraph } from 'react-icons/go';
import { manageCount } from '../utils/manageInfo';
import { useLocation } from 'react-router-dom';
import useSocket from './useSocket';

export default function useInformation(acceptedRoutes?: any) {
  const { pathname } = useLocation();
  const [analytics,setAnalytics]= useState(
    {
      totalHits: 0,
      todayData: 0,
      yesterdayData: 0,
      totalData: 0
  }
  );

  const [clickData, setClickData] = useState([
    {
      title: 'Total Hits',
      icon: GoGraph,
      total: 0,
      overviewInPercent: 100,
    },
    {
      title: 'Today Data',
      icon: GoGraph,
      total: 0,
      overviewInPercent: 0,
    },
    {
      title: 'Yesterday Data',
      icon: GoGraph,
      total: 0,
      overviewInPercent: 0,
    },
    {
      title: 'Total Data',
      icon: GoGraph,
      total: 0,
      overviewInPercent: 0,
    },
  ]);
  const {receive,joinRoom} = useSocket()
  const { role, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<[]>([]);
  const [displayInfo,setDisplayInfo] = useState<[]>([]);
  const [isRefresh, setIsRefresh] = useState(0);
  const [page,setPage] = useState<any>(1)
  const [totalPages,setTotalPages]= useState(0)
  

  let url: string;
  let analyticsUrl: string;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (role === 'subadmin' || acceptedRoutes?.route === pathname) {
          url = `information?createdBy=${user._id}&page=${page}`;
          analyticsUrl =  `analytics?id=${user?.id}&createdBy=${user._id}`;
        }
        else if(role === 'admin' || acceptedRoutes?.route === pathname) {
          url = `information?page=${page}`;
          analyticsUrl = `analytics`;
        }
        else {
          url = `information?id=${user?.id}&page=${page}`;
          analyticsUrl = `analytics?id=${user?.id}`;
        }
        const data:any = await getData(url);
        const analyticsData:any = await getData(analyticsUrl)
        setAnalytics(analyticsData)
        setTotalPages(data.pages.totalPages);
        setInfo((data as any)?.data);
        setDisplayInfo((data as any)?.data?.filter((item:any) => "email" in item))
        setLoading(false);
          
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user, isRefresh,page,setPage]);

  const userId = user?.id;
  useEffect(() => {
    const eventName =
      acceptedRoutes?.route === pathname ? 'conversion' : 'infoUpdate';
    
    if (!acceptedRoutes?.route) {
     joinRoom(userId);
    }
    receive(eventName, ({ data }: any) => {
     
      const objectIndex = info.findIndex(
        (obj) => {
         
          return (obj as any)?._id === data._id}
      );

      setInfo((state: any) => {

        if (objectIndex !== -1) {
          return state.map((obj: any, index: any) =>
            index === objectIndex ? data : obj,
          );
        } else {
          
            return [...state, data];
        }
      });

setIsRefresh(Math.random())
  });
  }, []);

  useEffect(() => {
    const { yesterdayDataLength, todayDataLength,totalClick,thisMonthDataLength ,averageLeadData } =
    manageCount(info);
  setClickData((prevClickData) => [
    {
      ...prevClickData[0],
      total: analytics.totalHits,
    },
    {
      ...prevClickData[1],
      total: analytics.todayData,
    },
    {
      ...prevClickData[2],
      total: analytics.yesterdayData,
    },
    {
      ...prevClickData[3],
      total: analytics.totalData,
        overviewInPercent: averageLeadData,
    },
  ]);
  },[info])
 
  return {
    info,
    displayInfo,
    loading,
    setIsRefresh,
    role,
    clickData,
    setTotalPages,
    totalPages,
    page,
    setPage
  };
}
