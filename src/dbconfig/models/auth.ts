import mongoose from "mongoose";


const userAuth = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    password: {
        type:String,
        required:true,
        minlength:8
    }
});

const user = mongoose.models.users ||  mongoose.model('users', userAuth)

export default user;