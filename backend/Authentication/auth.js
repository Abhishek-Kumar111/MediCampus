const jwt = require('jsonwebtoken');
const UserModel = require('../Models/user');


exports.studentAuth = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(token){

            const decode = jwt.verify(token, "Its_My_Secret_Key");//secreate key pass karte hai as 2nd argument
            req.user = await UserModel.findById(decode.userId).select('-password');//we don't need password that's why removing password
            next();

        }else{
            return res.status(401).json({ error: 'No token, authorization denied' });
        }
    }catch(err){
        res.status(401).json({ error: 'Something Went Wrong in Authentication' });
    }
}

exports.adminFacultyAuth = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(token){

            const decode = jwt.verify(token, "Its_My_Secret_Key");
            console.log(decode)

            req.user = await UserModel.findById(decode.userId).select('-password');
            if(req?.user?.role==="student"){ //this is main things where we decide the student and faclty...
               throw new Error("You dont have access to this page");
                
            }

            next();

        }else{
            return res.status(401).json({ error: 'No token, authorization denied' });
        }
    }catch(err){
        res.status(401).json({ error: 'Something Went Wrong in Authentication' });
    }
}


