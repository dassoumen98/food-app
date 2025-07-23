import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true , 'user name is required']
    },
    email:{
        type :String,
        required:[true , 'email is required'],
        unique:true
    },
    password:{
        type :String,
        required:[true , 'password is required'],
        
    },
    address:{
        type:Array
        
    },
    phone:{
        type:String,
        required:[true , 'phone is required']

    },
    usertype:{
        type:String,
        required:[true, 'user type is required'],
        default:'clinet',
        enum: ['clinet' ,'admin', 'vendor', 'driver']
    },
    profile:{
        type:String,
        default:'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
    }


}
,{timestamps:true})

const User = mongoose.model('User' , userSchema)
export default User