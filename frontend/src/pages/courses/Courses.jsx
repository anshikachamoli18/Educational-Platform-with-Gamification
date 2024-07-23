import React from 'react';
import './Courses.css';
import { CourseData } from '../../context/CourseContext';
import coursecard from '../../Components/coursecard/coursecard';

const Courses = () => {
  const {courses}=CourseData();
  return (
    <div className="courses">
      <h2>Available Courses</h2>
      <div className="course-container">
        {
          courses&&courses.length>0?courses.map((e)=>(<coursecard key={e._id} course={e}/>)):<p>No Courses Yet</p>
        }
      </div>
    </div>
  )
}

export default Courses
