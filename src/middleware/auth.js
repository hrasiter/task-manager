const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { removeListener, find } = require("../models/task");

const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //bu kullanıcı için bu token oluşturulmuş mu
        const user = await User.findOne({_id:decoded._id, 'tokens.token': token})
       if(!user){
           throw new Error()
       }
       req.user = user
       req.token = token
       next()
    }catch(e){
        res.status(401).send({error: 'Please authenticate!'})
    }
}

module.exports = auth