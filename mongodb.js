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

    // db.collection('users').updateOne({
    //     _id:new ObjectID("602c20d00e3cb717995b022c")
    // },{
    //     $set:{
    //         name: 'Rasiter'
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('users').updateOne({
    //     name:'Alyosa'
    // },{
    //     $inc:{
    //         age: -1
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('tasks').updateMany({
        completed: false
    },{
        $set:{
            completed:true
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})