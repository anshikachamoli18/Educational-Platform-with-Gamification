import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './database/db.js';
import Razorpay from 'razorpay';
import cors from 'cors';

dotenv.config();

export const instance=new Razorpay({key_id:process.env.Razorpay_key,key_secret:process.env.Razorpay_secret});

const app=express();
app.use(express.json());
app.use(cors());

const port=process.env.PORT ;

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use("/uploads",express.static('uploads'));

import userRoutes from './routes/user.js';
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';


app.use('/api',userRoutes);
app.use('/api',courseRoutes);
app.use('/api',adminRoutes);

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
})