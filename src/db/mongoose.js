const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex: true
})

const User = mongoose.model('User',{
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

// const me = new User({
//     name: '   Mike   ',
//     email: 'mikeEmail@sample.cOM',
//     password: '  PASsword   '
// })

// me.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log('Error! ', error)
// })


const Task = mongoose.model('Task',{
    description:{
        type: String,
        trim: true,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    }
}) 

const first = new Task({
    description: '    Second task    ',
})

first.save().then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log('Error! ', error)
})
