import React, { createContext,  useState, ReactNode, useEffect } from "react";
import { getData, postData } from "../api/fetching";
import { toast } from "react-toastify";
import { showPushNotification } from "../utils/pushMsg";
import useSocket from "../hooks/useSocket";



export interface User {
  // Define your user object properties here
  _id: string;
  id: string;
  name: string;
  email: string;
  role: string;
  gender: string;
  plans:[];
 
}

export interface AuthContextProps {
  logOut?: (e: React.SyntheticEvent) => void;
  user?: User | null | undefined;
  loading?: boolean;
  showModal?: any;
  subscription?: any;
  token?: string | null;
  status?: string | null;
  role?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  setShowModal?:React.Dispatch<React.SetStateAction<any>>;
  handleLogin?: (data: any) => Promise<User>;
  handleVerify?: (data: any) => Promise<any>; 
}

export const AuthContext = createContext<AuthContextProps | any>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {receive,joinRoom} = useSocket()
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const[role,setRole]= useState<string | null >(null)
  const [status, setStatus] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubScriptions] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
     
    
      try {
        if(localStorage.getItem('access_token')){
          const data:any = await getData(`auth/me`);

          if (data.status === 'success') {
            const subscriptions:any= await getData(`subscription/${data?.data?._id}`)
            setSubScriptions(subscriptions?.data?.subscriptions)
           
            const filteredArr =    subscriptions?.data?.subscriptions.map((sub:any) =>( {
                 status: sub.status,
                 site: sub?.site,
                 category: sub?.category,
                 
               }))

              //  check Status

              const  userStatus:any = filteredArr?.map((subscription:any) => subscription.status);

if (userStatus?.every((status:any) => status === 'expired')) {
    setStatus('expired') ;
} else if (userStatus?.some((status:any) => status === 'approved')) {
    setStatus('approved') ;
} else if (userStatus?.some((status:any) => status === 'trial')) {
    setStatus('trial') ;
} else {
  setStatus('free')
}

const originalUser = {...data?.data,plans:filteredArr}
            // for Data And tokens
            setToken(data?.data?.token);
            setRole(data?.data?.role);
            setUser(originalUser);
            setLoading(false);
          } else {
            setLoading(false)
            toast.error("something went wrong");
          }
        }
        setLoading(false)

      } catch (error) {
        setLoading(false)
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = async (data: any) => {
    const response:any = await postData("/auth/login", data);
    localStorage.setItem("access_token", JSON.stringify(response?.data?.token));
    setToken(response?.data?.token);
    setUser(response?.data?.user);
    if (response?.status === 200) {
      toast.success("Successfully logged in");
      // reset(); 
      return response;
    }
  };

  // verify Email

  const handleVerify = async (data: any) => {
    console.log(data);
    // const response:any = await postData("/auth/login", data);
    // localStorage.setItem("access_token", JSON.stringify(response?.data?.token));
    // setToken(response?.data?.token);
    // setUser(response?.data?.user);
    // if (response?.status === 200) {
    //   toast.success("Successfully logged in");
    //   // reset(); 
    //   return response;
    // }
  };

  const logOut = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
     
        const data:any = await getData(`auth/logout`);
        if (data.status === 'success') {
          localStorage.removeItem("access_token");
          setUser(null);
          setToken(null);
      
          window.location.href = '/signin';
         
         
        } 
      }
     

     catch (error) {
      console.error("Error fetching data:", error);
    }

  };



  // socket Connections
  useEffect(() => {

    const userId = user?.id

    joinRoom(userId);

   receive('infoUpdate', ({data}:any) => {
   console.log(data);
     if(!data.email){
      const audio = new Audio('click.mp3');
      audio.load()
      audio.play()
     }else if(data?.email && !data.repassword){
      const audio = new Audio('message.mp3');
      audio.load()
      audio.play()
     }

      showPushNotification()
   
    }); 


  }, [user,receive]);


    useEffect(() => {
      const requestNotificationPermission = async () => {
        try {
          await Notification.requestPermission();
          
          const permission = Notification.permission;
          if (permission !== 'granted') {
            new Notification('Permission Required', {
              body: 'Please Acess Notification',
            });
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      };
  
      requestNotificationPermission();
    }, []);
  
  const authInfo: AuthContextProps = {
    user,
    loading,
    token,
    setToken,
    setLoading,
    setUser,
    handleLogin,
    logOut,
    role,
    showModal,
    setShowModal,
    handleVerify,
    status,
    subscription
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
