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

    // db.collection('users').deleteMany({
    //     age:34
    // }).then((result)=>{
    //     console.log(result.deletedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description: 'Hard work'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
})