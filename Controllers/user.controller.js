
import {User} from '../Models/user.models.js'



const login=async(req,res)=>{

    try{
        const { username, email, password } = req.body;

        console.log(username);

        if(!email || !password || !username){
            return res.status(400).json({message:"Please enter all fields"});
        }


        const user=await User.findOne({$or:[{email:email},{username:username}]}); //find user by email or username


        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }

        const isMatch=await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const accesstoken=await user.generatAccessToken();
        const refreshtoken=await user.generatRefreshToken();

        await User.findByIdAndUpdate(user._id,{refreshtoken});
        
        

        const options={
            httpOnly:true,
            secure:true,
        }

    

        res.status(200)
        .cookie('AccessToken',accesstoken,options)
        .cookie('RefreshToken',refreshtoken,options)
        .json({message:"Login successful"});

    }
    catch(err){
        res.status(500).json({message:err.message});
    }

}

const register=async(req,res)=>{

    try{
        const{username, email, password }=req.body;

        if(!email){
            return res.status(400).json({message:"Please enter all fields"});
        }

        const user=await User.findOne({$or:[{email:email},{username:username}]}); //find user by email or username

        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        const newuser=await User.create({
            email,
            password,
            username
        })

        //await newuser.save();

        res.status(200)
        .json({message:"Registration successful"});

    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }

}

const logout=async(req,res)=>{

    try{
        await User.findByIdAndUpdate(req.userId,{refreshtoken:""});

        res.status(200)
        .clearCookie('AccessToken')
        .clearCookie('RefreshToken')
        .json({messaage:"Logout successful"})
            
    }
    catch(err){
        res.status(500).json({message:err.message});
    }

}

const finduser=async(req,res)=>{
    try{

        const username=req.params.username;
        const user=await User.findOne({username});
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

 const deleteuser=async(req,res)=>{

    try{
    const id=req.params.userid;

    
    await User.findByIdAndDelete(id);

    

    res.status(201)
    .json({message:"User deleted"})
    }
    catch(err){
        console.log(err);
        res.status(404)
        .json({message:"id doesnt exist"})
    }
}

export {login,register,logout,finduser,deleteuser}