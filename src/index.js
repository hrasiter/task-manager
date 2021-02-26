const app = require('./app')
const path = require('path')
const hbs = require('hbs')
const express = require('express')

const port = process.env.PORT

const publicdir = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

app.use(express.static(publicdir))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'ToDo App',
        name: 'Rasit'
    })
})

app.listen(port, ()=>{
    console.log('Server is listening on port ' + port)
})