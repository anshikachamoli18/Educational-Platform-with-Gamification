import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CourseContext=createContext();

export const CourseContextProvider=({children})=>{
    const [courses,setCourses]=useState([]);
    const [course,setCourse]=useState([]);
    const [myCourses,setMyCourses]=useState([]);

    async function fetchCourses(){
        try{
              const {data}=await axios.get(`http://localhoat:5000/api/course/all`);
              setCourses(data.courses);
        }
        catch(error){
            console.log(error);
        }
    }

    async function fetchMyCourse(){
        try{
         const {data}=await axios.get(`http://localhost:5000/api/course/mycourse`,{
            headers:{
                token: localStorage.getItem('token')
            }
         });
            setMyCourses(data.courses);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchCourses();
        fetchMyCourse();
    },[]);

    async function fetchCourse(id){
           try{
              const {data}=await axios.get(`http://localhost:5000/api/course/${id}`);
              setCourse(data.course);
           }
           catch(error)
           {
             console.log(error);
           }
    }

    return <CourseContext.Provider value={{courses,fetchCourses,fetchCourse,course,myCourses,fetchMyCourse}}>
        {children}
    </CourseContext.Provider>
};

export const CourseData=()=>useContext(CourseContext);