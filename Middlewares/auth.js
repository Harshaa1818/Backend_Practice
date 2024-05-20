import jwt from 'jsonwebtoken';
import {User} from '../Models/user.models.js'

const verifyJWT=async(req,res,next)=>{
    const token = req.header("Authorization")?.replace("Bearer ","")
    const Decoded_accesstoken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    //const refreshtoken=jwt.verify(reftoken,process.env.REFRESH_TOKEN_SECRET); 

    if(!accesstoken){
        return res.status(401).json({message:"Unauthorized"});
    }
    
     const userId= await User.findById(Decoded_accesstoken._id);
        if(!userId){
            return res.status(401).json({message:"Unauthorized"});
        }
        req.userId=userId;
        next();

}
export {verifyJWT}