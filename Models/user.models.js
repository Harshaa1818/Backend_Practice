
import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


const userschema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshtoken:{
        type:String,
        required:true

    }
    
},
{
    timestamps:true
})

userschema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
    next();
})

userschema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userschema.methods.generatAccessToken=async function(){
    try{
        let token=jwt.sign(
            {_id:this._id},
            process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })
        return token;
        
    }
    catch(error){
        console.log(error)
    }
}

userschema.methods.generatRefreshToken=async function(){
    try{
        let token=jwt.sign(
            {_id:this._id},
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_LIFE
            }
        )
        return token;
        
    }
    catch(error){
        console.log(error)
    }

}

export  const User=mongoose.model('User',userschema)