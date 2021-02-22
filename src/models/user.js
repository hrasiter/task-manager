const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')
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
        unique:true,
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
    },
    tokens:[{
        token:{
            type: String,
            required:true
        }
    }]
}, {
    timestamps: true
})

//authenticate user

userSchema.methods.generateAuthToken = async function(){
    user = this
    const token = jwt.sign({_id : user._id.toString()}, 'thisisthecourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.toJSON = function(){
    user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

//Find user by email and compare password
userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})
    if(!user){
        console.log('Cannot find user')
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        console.log('Password mismatch')
        throw new Error('Unable to login')
    }

    return user
}

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

//Hashing plain-text password
userSchema.pre('save', async function(next){
    const user = this
    try {
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password,8)
            console.log('changing password')
        }
        next()
    } catch (e) {
        console.log('Error please: ', e)
    }

})

userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User