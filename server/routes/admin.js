import express from 'express';
import { createCourse, addLecture , deleteLecture, deleteCourse, getAllStats, updateRole, getAllUser} from '../controllers/admin.js';
import { isAuth , isAdmin} from '../middleware/isAuth.js';
import uploadFiles  from '../middleware/multer.js';
const router = express.Router();

router.post('/course/new',isAuth,isAdmin,uploadFiles,createCourse);
router.post('/course/:id',isAuth,isAdmin,uploadFiles,addLecture);
router.delete('/course/:id',isAuth,isAdmin,deleteCourse);
router.delete('/lecture/:id',isAuth,isAdmin,deleteLecture);
router.get('/stats',isAuth,isAdmin,getAllStats);
router.put('/user/:id',isAuth,isAdmin,updateRole);
router.get('/users',isAuth,isAdmin,getAllUser);
export default router;