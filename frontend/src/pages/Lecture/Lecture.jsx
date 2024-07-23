import React, { useEffect } from 'react';
import './Lecture.css';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';

const Lecture = ({user}) => {
    const [lectures,setLectures]=useState([]);
    const [lecture,setLecture]=useState({});
    const [loading,setLoading]=useState(true);
    const [lectureLoading,setLectureLoading]=useState(false);
    const [show,setShow]=useState(false);
    const params= useParams();
    const navigate=useNavigate();
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [video,setVideo]=useState("");
    const [videoPreview,setVideoPreview]=useState("");
    const [btnLoading,setBtnLoading]=useState(false);

    if(user&&user.role!=="admin"&&user.subscription.includes(params.id)){
        return navigate("/login");
    }

    async function fetchLectures(){
        try{
            const {data}= await axios.get(`http://localhost:5000/api/lectures/${params.id}`,{
                headers:{
          token:localStorage.getItem("token")
                } 
            });
            setLectures(data.lectures);
            setLoading(false);
        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    const changeVideoHandler=(e)=>{
        const file= e.target.files[0];
        const reader= new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend=()=>
        {
          setVideoPreview(reader.result);
           setVideo(file);
        }
        
    }

    const submitHandler=async(e)=>{
           setBtnLoading(true);
            e.preventDefault();
            const formData= new FormData();
                formData.append("title",title);
            formData.append("description",description);
                formData.append("file",video);
            try{
                
                const {data}=await axios.post(`http://localhost:5000/api/lecture/${params.id}`,formData,{
                    headers:{
                        token:localStorage.getItem("token")
                    }
                });
                fetchLectures();
                setBtnLoading(false);
              }
              catch(error){
                  console.log(error);
                  toast.error(error.response.data.errorMessage);
                  setBtnLoading(false);
              }
    }

    const deleteHandler= async function (id){
       if(confirm("Are you sure you want to delete this lecture?")){
            try{
                const {data}=await axios.delete(`http://localhost:5000/api/lecture/${id}`,{
                    headers:{
                        token:localStorage.getItem("token")
                    }
                });
                toast.success(data.message);
                fetchLectures();
            }catch(error){
       toast.error(error.response.data.errorMessage);
       }
    }
  }

    useEffect(()=>{
        fetchLectures();
    },[]);

    async function fetchLecture(id){
        try{
            setLectureLoading(true);
            const {data}= await axios.get(`http://localhost:5000/api/lecture/${id}`,{
                headers:{
          token:localStorage.getItem("token")
                } 
            });
            setLecture(data.lecture);
            setLectureLoading(false);
        }catch(error){
            console.log(error);
            setLectureLoading(false);
        }
    }

  return (
    <>
    {
       loading?<Loading/>:
       <>
       <div className="lecture-page">
         <div className="left">
           {
             lectureLoading? <Loading/>:
             <>
               {
                 lecture.video? <>
                     <video src={`http://localhost:5000/${lecture.video}`} controls width={"100%"} controlsList='nodownload noremoteplayback' disablePictureInPicture disableRemotePlayback autoPlay></video>
                        <h1>{lecture.title}</h1>
                        <h3>{lecture.description}</h3>
                 </>:<h1>Please Select a Lecture</h1>
               }
             </>
           }
         </div>
         <div className="right">
            {
                user&&user.role==="admin"&&(<button className='common-btn' onClick={()=>setShow(!show)}>{show?"Close":"Add Lecture +"}</button>)
            }
            {
                show&& <div className="lecture-form">
                    <h2>Add Lecture</h2>
                    <form onSubmit={submitHandler}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" value={title} onChange={(e)=>setTitle(e.target.value)}required/>

                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" value={description} onChange={(e)=>setDescription(e.target.value)} required></textarea>

                        <label htmlFor="video">Video</label>
                        <input type="file" name="video" id="video" placeholder='choose video' onChange={changeVideoHandler}required />

                        {
                            videoPreview&&<video src={videoPreview} width={300} controls></video>
                        }
                        <button type="submit" className='common-btn'>Add Lecture</button>
                    </form>
                </div>
            }
            {
                lectures&& lectures.length>0?
                (lectures.map((e,i)=>(<>
                <div className={`lecture-number ${lecture._id== e._id&&"active"}` }onClick={()=>fetchLecture(e._id)} key={i}>
                  {i+1} .{e.title}
                </div>
                {
                    user&&user.role==="admin"&&<button className='common-btn' style={{backgroundColor:"red"}} onClick={()=>deleteHandler(e._id)}>Delete {e.title}</button>
                }
                </>)))
                :<p>No Lectures Yet</p>
            }
         </div>
       </div>
       </>
    }
    </>
  )
}

export default Lecture
