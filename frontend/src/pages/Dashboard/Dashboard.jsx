import React from 'react';
import './Dashboard.css';
import { CourseData } from '../../context/CourseContext';
import coursecard from '../../Components/coursecard/coursecard';

const Dashboard = () => {
    const {myCourses}=CourseData();
    return (
    <div className='student-dashboard'>
        <h2>All Enrolled Courses</h2>
        <div className="dashboard-content">
            {
                myCourses&&myCourses.length>0?myCourses.map((e)=><coursecard key={e._id} course={e}/>):<h3>No Courses Found</h3>
            }
        </div>
    </div>
  )
}

export default Dashboard
