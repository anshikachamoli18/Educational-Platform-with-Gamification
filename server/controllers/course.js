import TryCatch from '../middleware/TryCatch.js';
import Course from '../models/Course.js';
import Lecture from '../models/Lecture.js';
import User from '../models/User.js';
import { instance } from '../index.js';
import crypto from 'crypto';
import Payment from '../models/Payment.js';

export const getAllCourses= TryCatch(async (req, res) => {
    const courses = await Course.find();
    res.json({ courses });
});

export const getSingleCourse= TryCatch(async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        });
    }
    res.json({ course });
});

export const fetchLectures= TryCatch(async (req, res) => {
    const lectures= await Lecture.find({course: req.params.id});

    const user=await User.findById(req.user._id);

    if(user.role==="admin"){
        return res.json({ lectures });
    }
    if(!user.subscription.includes(req.params.id)){
        return res.status(400).json({ 
            message:"You have not subscribed to this course"});
    }

    res.json({ lectures });
});

export const fetchLecture=TryCatch(async(req,res)=>
{
    const lecture= await Lecture.findById(req.params.id);

    const user=await User.findById(req.user._id);

    if(user.role==="admin"){
        return res.json({ lecture });
    }
    if(!user.subscription.includes(lecture.course)){
        return res.status(400).json({ 
            message:"You have not subscribed to this course"});
    }

    res.json({ lecture });
});

export const getMyCourses=TryCatch(async(req,res)=>{
    const courses= await Course.find({_id: req.user.subscription});
    res.json({courses});
});

export const checkout=TryCatch(async(req,res)=>{
    const user= await User.findById(req.user._id);
    const course= await Course.findById(req.params.id);
    if(user.subscription.includes(course._id)){
        return res.status(400).json({message:"You have already subscribed to this course"});
    }

    const options={
        amount:Number(course.price*100),
        currency:"INR",
    };
    const order= await instance.orders.create(options);

    res.status(201).json({order,course});
});

export const paymentVerification=TryCatch(async(req,res)=>{
   const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
   const body=razorpay_order_id + "|" + razorpay_payment_id;
   const expectedSignature=crypto.createHmac('sha256',process.env.Razorpay_secret).update(body).digest('hex');

   const isAuthentic=expectedSignature===razorpay_signature;
    if(!isAuthentic){
         return res.status(400).json({message:"Invalid payment"});
    }
    else{
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });
        const user= await User.findById(req.user._id);
        const course= await Course.findById(req.params.id);
        user.subscription.push(course._id);
        await user.save();
        res.status(200).json({message:"Course Purchased Successfully"});
    }
});