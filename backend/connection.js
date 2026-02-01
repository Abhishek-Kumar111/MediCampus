const mongoose = require('mongoose')


const mongoDBURL = process.env.MONGODB_URL; 


mongoose.connect(mongoDBURL)
    .then(res=>{
        console.log("DataBase Connected Successfully")
}).catch(err=>{
        console.log(err)
})

