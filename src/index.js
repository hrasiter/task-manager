const app = require('./app')
const path = require('path')
const express = require('express')

const port = process.env.PORT

const publicdir = path.join(__dirname, '../public')
app.use(express.static(publicdir))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Rasit'
    })
})

app.listen(port, ()=>{
    console.log('Server is listening on port ' + port)
})