const mongoose = require('mongoose')


const mongoDBURL = "mongodb+srv://abhijee9815_db_user:dOki6cHUTI6XNYNs@cluster0.wnwidhp.mongodb.net/mediCampDB?appName=Cluster0" ; 


mongoose.connect(mongoDBURL)
    .then(res=>{
        console.log("DataBase Connected Successfully")
}).catch(err=>{
        console.log(err)
})

