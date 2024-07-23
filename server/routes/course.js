import express from 'express';
import { fetchLectures, getAllCourses, getSingleCourse , fetchLecture, getMyCourses, paymentVerification, checkout} from '../controllers/course.js';
import {isAuth} from '../middleware/isAuth.js';
const router = express.Router();

router.get('/course/all',getAllCourses);
router.get('/course/:id',getSingleCourse);
router.get('/lectures/:id',isAuth,fetchLectures);
router.get('/lecture/:id',isAuth,fetchLecture);
router.get('/mycourse',isAuth,getMyCourses);
router.post('/course/checkout',isAuth,checkout);
router.post('/verification/:id',isAuth,paymentVerification);

export default router;