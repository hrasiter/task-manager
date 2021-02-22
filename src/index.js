const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next)=>{
//     console.log(req.method, req.path)
//     if(req.method === 'GET'){
//         res.send('GET request are disabled')
//     }else{
//         next()
//     }
    
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Site is currently down. Check back soon!')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log('Server is listening on port ' + port)
})

// const jwt = require('jsonwebtoken')

// const myFunction = async () => {  
//     const token = jwt.sign({__id: 'asdsadasd'},'thisisthecoursetoken', {expiresIn:'7 days'})  
//     console.log(token)

//     const data = jwt.verify(token, 'thisisthecoursetoken')
//     console.log(data)
// }

// myFunction()

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async ()=>{
//     // const task = await Task.findById('6034097c1c5395126cf7895f')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('603408a40c321811d611e407')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

//main()