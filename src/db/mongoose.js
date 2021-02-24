const mongoose = require('mongoose')
const validator = require('validator')

mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useFindAndModify: false
})
