import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const isAuth = async (req, res, next) => {
    try {
        // Retrieve token from the headers
        const token = req.headers.token;
        if (!token) {
            return res.status(403).json({
                message: "Please Login"
            });
        }

        // Verify token
        const decodedData = jwt.verify(token, process.env.Jwt_Sec);
        //console.log("Decoded Data:", decodedData);

        // Find user by ID
        req.user = await User.findById(decodedData._id);
        if (!req.user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Login First"
        });
    }
};

export const isAdmin=(req,res,next)=>{
try{
   if(req.user.role!=="admin")
   {
      return res.status(403).json({
        message:"You are not admin"
      })
   }
   next();
}
catch(error){
    return res.status(500).json({
        message: error.message
    });
}
};
