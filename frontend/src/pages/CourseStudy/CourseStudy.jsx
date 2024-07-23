import React from 'react';
import './CourseStudy.css';
import { useParams, useNavigate } from 'react-router-dom';

const CourseStudy = () => {
    const params=useParams();
    const {fetchCourse,course}=CourseData();
    const navigate=useNavigate();
    if(user&&user.role!=="admin"&&!user.subscription.includes(params.id)){
        return navigate('/');
    }

    useEffect(()=>{
        fetchCourse(params.id);
    },[]);
  return (
    <>
    {
       course&&<div className="course-study-page">
        <img src={`http://localhost:5000/${course.image}`} alt="" width={350} />
        <h2>{course.title}</h2>
        <h4>{course.description}</h4>
        <h5>by - {course.createdBy}</h5>
        <h5>Duration - {course.duration} weeks</h5>
        <Link to={`/lectures/{course._id}`}>
        <h2>Lectures</h2></Link>
       </div> 
    }
    </>
  )
}

export default CourseStudy
