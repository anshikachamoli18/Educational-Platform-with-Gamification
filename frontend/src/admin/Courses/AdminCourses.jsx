import React, { useState } from 'react';
import './AdminCourses.css';
import Layout from '../Utils/Layout';
import { useNavigate } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import coursecard from '../../Components/coursecard/coursecard';
import toast from 'react-hot-toast';
import axios from 'axios';

const categories=["Web development","App Development","Game Development","Data Science","Artificial Intelligence"];

const AdminCourses = ({user}) => {
  const navigate=useNavigate();
    if(user&&user.role!=='admin')
        return navigate('/');

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    const [price,setPrice]=useState("");
    const [createdBy,setCreatedBy]=useState("");
    const [image,setImage]=useState("");
    const [imagePrev,setImagePreview]=useState(false);
    const [btnLoading,setBtnLoading]=useState(false);
    const [duration, setDuration]=useState("");

    const {courses, fetchCourses}
=CourseData();

    const changeImageHandler=(e)=>{
      const file= e.target.files[0];
        const reader= new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend=()=>
        {
           setImagePreview(reader.result);
           setImage(file);
        }
    }

    const submitHandler=async(e)=>{
         e.preventdefault();
         setBtnLoading(true);

         const myForm=new FormData();
         myForm.append('title',title);
        myForm.append('description', description);
        myForm.append('category', category);
        myForm.append('price', price);
        myForm.append('createdBy', createdBy);
        myForm.append('duration', duration);
        myForm.append('file', image);

        try{
        const {data}=await axios.post(`http://localhost:5000/api/course/new`,myForm,{
          headers:{
            token: localStorage.getItem('token')
          }
        });
        toast.success(data.messaage);
        setBtnLoading(false);
        await fetchCourses();
        setImage("");
        setDescription("");
        setDuration("");
        setTitle("");
        setImagePreview("");
        setCategory("");
        setCreatedBy("");
        setPrice("");
        }
        catch(error)
        {
          toast.error(error.response.data.messaage);
        }
    }
  return (
<Layout>
    <div className="admin-courses">
      <div className="left">
        <h1>All Courses</h1>
        <div className="dashboard-content">
          {
            courses&&courses.length >0?(
              courses.map(e=>{
                return <coursecard key={e._id} course={e}/>
              })):<p>No Courses Yet</p>
          }
        </div>
      </div>

      <div className="right">
        <div className="add-course">
          <div className="course-form">
            <h2>Add Course</h2>
            <form onSubmit={submitHandler}>
              <label htmlFor="text">Title</label>
              <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}required/>

              <label htmlFor="text">Description</label>
              <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}required/>

              <label htmlFor="text">Price</label>
              <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}required/>

              <label htmlFor="text">Created By</label>
              <input type="text" value={createdBy} onChange={(e)=>setCreatedBy(e.target.value)}required/>
               
               <select value={category} onChange={(e)=>setCategory(e.target.value)}><option value={""}>Select Category</option>
               {
                     categories.map((e)=>(
                      <option value={e} key={e}>{e} 
                                  </option>
                     ))
               }
               </select>

               <label htmlFor="text">Created By</label>
              <input type="number" value={duration} onChange={(e)=>setDuration(e.target.value)}required/>

              <input type="file" required onChange={changeImageHandler} />
              {
                imagePrev&& <img src={imagePrev}  alt="" width={300}/>
              }

              <button type='submit' disabled={btnLoading} className='common-btn'>{btnLoading?"Please Wait...":"Add"}</button>

            </form>
          </div>
        </div>
      </div>
      </div> 
</Layout>
  )
}

export default AdminCourses;