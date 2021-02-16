//CRUD: create, read, update, delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const id = new ObjectID()
console.log(id)
console.log(id.id.length)
console.log(id.toHexString().length)

MongoClient.connect(connectionURL, {useUnifiedTopology:true}, (error, client)=>{
    if(error){
        return console.log('Unable to connect to database!')
    }
    console.log('Connected successfully.')

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Rasit 3',
    //     age:34
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Aysgl',
    //         age: 29
    //     },{
    //         name: 'Alyosa',
    //         age:2
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Hard work',
    //         completed: false
    //     },{
    //         description: 'change job',
    //         completed:false
    //     },{
    //         description: 'Study for new subjects',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert task documents!')
    //     }

    //     console.log(result.ops)
    // })
})