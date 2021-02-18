require('../src/db/mongoose')

const User = require('../src/models/user')
const Task = require('../src/models/task')

User.findByIdAndUpdate('602da3eb9bd03724be37063e',{age:1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:1})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})