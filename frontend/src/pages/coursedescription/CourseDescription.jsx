import React, { useEffect, useState } from 'react';
import './CourseDescription.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { UserData } from '../../context/UserContext';
import Loading from '../../Components/Loading/Loading';

const CourseDescription = ({user}) => {
    const params=useParams();
    const {fetchCourse,course,fetchCourses,fetchMyCourse}=CourseData();
    const navigate=useNavigate();

    const [loading,setLoading]=useState(false);
    const {fetchUser}=UserData();
    
    useEffect(()=>{
        fetchCourse(params.id);
    },[]);

    const checkoutHandler=async()=>{
          const token=localStorage.getItem('token');
          setLoading(true);

          const {data:{order}}=await axios.post(`http://localhost:5000/api/course/checkout/${course._id}`,{},{
                headers:{
                    token
                }
          });

            const options = {
                "key": "rzp_test_y0MeMyaj2wlvTt", // Enter the Key ID generated from the Dashboard
    "amount": order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "E Learning", //your business name
    "description": "Learn with us",
    "order_id": order.id,
    "handler": async function (response){
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=response;

        try{

            const {data}=await axios.post(`http://localhost:5000/api/verification/${params.id}`,{razorpay_order_id,razorpay_payment_id,razorpay_signature},{
                headers:{
                    token
                }
            });

            await fetchUser();
            await fetchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`)
        }
        catch(error){
            toast.error(error.response.data.message);
            setLoading(false);
        }
     },
     theme:
     {
        color: "#8a4baf"
     }
    };

    const razorpay=new window.Razorpay(options);
    razorpay.open();
};

  return (
    <>
    {
        loading?(<Loading/>):
        (<>
            {
                course&&<div className="course-description">
                    <div className="course-header">
                        <img src={`http://localhost:5000/${course.image}`} alt="" className='course-image'/>
                        <div className="course-info">
                            <h2>{course.title}</h2>
                            <p>Instructor - {course.createdBy}</p>
                <p>Duration - {course.duration} weeks</p>
                        </div>
                    </div>
                   
                    <p>{course.description}</p>
                    <p>Let's get started with course At ₹{course.price}</p>
                        {
                            user&&user.subscription.includes(course._id)?<button className='common-btn' onClick={()=>navigate(`/course/study/${course._id}`)}>Study</button>:
                            <button className="common-btn" onClick={checkoutHandler}>Buy Now</button>
                        }
                </div>
            }
            </>)
    }
    </>
  )
}

export default CourseDescription;
