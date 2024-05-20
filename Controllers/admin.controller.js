import jwt from 'jsonwebtoken';


const homepage=async(req,res)=>{

    try{
        res.status(200).json({message:"Welcome to the homepage"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }

}

const login=async(req,res)=>{

    try{
        res.status(200).json({message:"Login successful"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }

}

const register=async(req,res)=>{

    try{
        res.status(200).json({message:"Registration successful"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }

}

const logout=async(req,res)=>{

    try{
        res.status(200).json({message:"Logout successful"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }

}

export {homepage,login,register,logout}