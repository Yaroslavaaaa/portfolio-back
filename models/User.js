import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    aboutUser:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    passwordHash:{
        type: String,
        required: true,
    }
}, {
    timestamps: true
})


export default mongoose.model("User", UserSchema)