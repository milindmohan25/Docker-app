import Doctor from '../models/DoctorSchema.js'
import bcrypt from 'bcryptjs'
import User from '../models/UserSchema.js'
import  Jwt  from 'jsonwebtoken';



export const register = async(req,res)=>{
    const {name,email, password,role} = req.body
    try {
        let user = null

        if (role=='patient'){
            user= await User.find({email})
        }
        else if(role=='doctor'){
            user= await Doctor.find({email})
        }
        //check if user exist\
        if(user){
            return res.status(400).json({Message: 'user already exist'})
        }

        //hash pwd
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        if(role=='patient'){
            user =new User({
               name,
               email,
               password:hashPassword,
               role,
            })
        }
        if(role==Doctor){
            user =new Doctor({
               name,
               email,
               password:hashPassword,
               role,
            })
        }
        await user.save()
        res.status(200).json({success:true, Message: 'user sucessfully registered'})
    } catch (error) {
        res.status(500).json({success:false, Message: 'internal server error TRY AGAIN'})
    }
};

export const login = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
};


