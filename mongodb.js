//CRUD: create, read, update, delete

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, {useUnifiedTopology:true}, (error, client)=>{
    if(error){
        return console.log('Unable to connect to database!')
    }
    console.log('Connected successfully.')

    const db = client.db(databaseName)


    // db.collection('users').findOne({_id: new ObjectID("602c1f8983dcad1776c7a6d8")},(error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch!')
    //     }

    //     console.log(user)
    // })

    //find return Cursor and it has so many methods.
    // db.collection('users').find({name:'Rasit'}).toArray((error, users)=>{
    //     console.log(users)
    // })
    

    // db.collection('users').find({name:'Rasit'}).count((error, count)=>{
    //     console.log(count)
    // })

    db.collection('tasks').findOne({_id: new ObjectID("602c23e6c3c4c9185bf11e3f")}, (error, task) =>{
        if(error){
            return console.log('Unable to fetch task!')
        }

        console.log(task)
        console.log()
    })

    db.collection('tasks').find({completed: false}).toArray((error, tasks)=>{
        if(error){
            return console.log('Unable to fetch tasks!')
        }

        console.log(tasks)
    })
})