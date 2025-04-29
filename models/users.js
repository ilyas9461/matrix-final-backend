const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        // minLength: 6
    },
    confirmPassword: {
        type: String,
        required: true,
        // minLength: 6
    },
    role:{
        type:String
    }
},
    { 
        timestamps: true 
    }
)

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel 