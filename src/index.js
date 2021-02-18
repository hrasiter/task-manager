const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res)=>{

    const user = new User(req.body)

    user.save().then(()=>{
        console.log(user)
        res.send(user)
    }).catch((e)=>{
        console.log('Error! ', e)
        res.status(400).send(e)
    })
})

app.post('/tasks', (req,res)=>{
    const task = new Task(req.body)

    task.save().then(()=>{
        console.log(task)
        res.send(task)
    }).catch((e)=>{
        console.log(e)
        res.status(400).send(e)
    })
})

app.listen(port, ()=>{
    console.log('Server is listening on port ' + port)
})