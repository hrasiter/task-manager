const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize:1000000, //in bytes
//     },
//     fileFilter(req, file, cb){
//         // cb(new Error('File must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a doc or docx'))
//         }

//         cb(undefined, true)
//     }
// })

// const errorMiddleware = (req, res, next)=>{
//     throw new Error('Error from middleware')
// }

// app.post('/upload', upload.single('upload') , (req, res)=>{
//     res.send()
// }, (error, req, res, next)=>{
//     res.status(400).send({error: error.message})
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log('Server is listening on port ' + port)
})