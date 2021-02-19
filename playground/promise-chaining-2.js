require('../src/db/mongoose')

const { countDocuments } = require('../src/models/task')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('602ed0acf6d10d1b5a00c011',{}).then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteAndCount = async (id) =>{
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed : false})
    return count
}

deleteAndCount('602ed0acf6d10d1b5a00c011').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})