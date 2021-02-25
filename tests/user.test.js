const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require ('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'testUser',
    email: 'testuser@example.com',
    password: 'testPasswd!!!' ,
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}



beforeEach(async ()=>{
    console.log('Before each')
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should sign-up new user', async ()=>{
    const response = await request(app).post('/users').send({
        name: 'Rasit',
        email: 'rasit@example.com',
        password:'MyPass777!'
    }).expect(201)

    //assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    
    //Assertions about the response
    expect(response.body).toMatchObject({
        user:{
            name: 'Rasit',
            email: 'rasit@example.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('MyPass777!')
})

test('Should login existing loging', async()=>{
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(user).not.toBeNull()
    expect(user.tokens[1].token).toBe(response.body.token)
})

test('Should fail to login', async()=>{
   await request(app).post('/users/login').send({
        email:userOne.email,
        password: "testpassword"
    }).expect(400)
})

test('Should get user profile', async ()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get user profile', async ()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete user account', async ()=>{
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete user', async ()=>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})


