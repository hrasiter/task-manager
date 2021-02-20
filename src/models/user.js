const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    age:{
        type: Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password should not contain "password" phrase!')
            }
        }
    }
})

userSchema.pre('save', async function(next){
    const user = this
    try {
        console.log('Encripting password')
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password,8)
        }
        next()
    } catch (e) {
        console.log('Error please: ', e)
    }

})

const User = mongoose.model('User',userSchema)

module.exports = User