import React from 'react';
import './coursecard.css';
import { UserData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CourseData } from '../../context/CourseContext';

const coursecard = ({course}) => {
    const {user, isAuth}=UserData();
    const navigate=useNavigate();
    const {fetchCourses}=CourseData();

    const deleteHandler=async (id)=>{
        if(confirm("Are you sure you want to delete this course?")){
          try{
            const {data}= await axios.delete(`http://localhost:5000/api/course/${id}`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            });
        toast.success(data.message);  
        fetchCourses();
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
  }

  return (
    <div className='course-card'>
        <img src={`http://localhost:5000/${course.image}`} alt="" className='course-image'/>
        <h3>{course.title}</h3>
        <p>Instructor - {course.createdBy}</p>
        <p>Duration - {course.duration} weeks</p>
        <p>Price - ₹{course.price}</p>
        {
            isAuth?(<>
            {user&&user.role!=='admin'?(<>
            {
                user.subscription.includes(course._id)?(<button className='common-btn' onClick={()=>navigate(`/course/study/${course._id}`)}>Study</button>):
(<button className='common-btn' onClick={()=>navigate(`/course/${course._id}`)}>Get Started</button>)
            }
            </>)
            :(<button className='common-btn' onClick={()=>navigate(`/course/study/${course._id}`)}>Study</button>)}
            </>)
            :
            (<button className='common-btn' onClick={()=>navigate('/login')}>Get Started</button>)
        } 
        <br/>
        {
            user&& user.role==="admin" && <button className='common-btn' style={{background:"red"}} onClick={()=>deleteHandler(course._id)}>Delete</button>
        }
    </div>
  )
}

export default coursecard
