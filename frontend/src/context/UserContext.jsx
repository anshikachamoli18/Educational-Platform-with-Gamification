import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import {useContext,createContext,useState, useEffect} from 'react';

const UserContext=createContext();

export const UserContextProvider=({children})=>{
    const [user,setUser]=useState([]);
    const [isAuth,setIsAuth]=useState(false);
    const [btnLoading,setBtnLoading]=useState(false);
    const [loading,setLoading]=useState(true);

    async function loginUser(email,password,navigate,fetchMyCourse) 
     {
        setBtnLoading(true);
        try{
         const {data}=await axios.post(`http://localhost:5000/api/user/login`,{email,password});
         toast.success(data.message);
         localStorage.setItem("token",data.token);
         setUser(data.user);
         setIsAuth(true);
         setBtnLoading(false);
         navigate("/");
         fetchMyCourse();
        }catch(error){
       console.log(error);
       setBtnLoading(false);
       setIsAuth(false);
       toast.error(error.response.data.message);
        }
    }

    async function registerUser(name,email,password,navigate) 
     {
        setBtnLoading(true);
        try{
         const {data}=await axios.post(`http://localhost:5000/api/user/register`,{name,email,password});
         toast.success(data.message);
         localStorage.setItem("activationToken",data.activationToken);
         setBtnLoading(false);
         navigate("/verify");
        }catch(error){
       console.log(error);
       setBtnLoading(false);
       toast.error(error.response.data.message);
        }
    }

    async function verifyOTP(otp,navigate){
        setBtnLoading(true);
        const activationToken=localStorage.getItem("activationToken");
        try{
         const {data}=await axios.post(`http://localhost:5000/api/user/verify`,{otp,activationToken});
         toast.success(data.message);
         navigate('/login');
         localStorage.clear();
         setBtnLoading(false);
        }
        catch(error)
        {
          setBtnLoading(false);
          toast.error(error.response.data.message);
        }
    }

    async function fetchUser(){
        try{
           const {data}=await axios.get(`http://localhost:5000/api/user/me`,{
            headers:{
                token: localStorage.getItem("token"),
            }
           });
           setIsAuth(true);
           setUser(data.user);
           setLoading(false);
        }
        catch(error){
         console.log(error);
         setLoading(false);
        }
    }

    useEffect(()=>{
        fetchUser();
    },[]);

    return <UserContext.Provider value={{user,setUser,isAuth,setIsAuth,loginUser,btnLoading,loading,registerUser,verifyOTP,fetchUser}}>{children}
    <Toaster/>
    </UserContext.Provider>
};

export const UserData=()=>useContext(UserContext);