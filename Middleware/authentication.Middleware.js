const jwt = require("jsonwebtoken")

const authoriser = (req,res,next)=>{
    const token = req.headers.authorization
    
    if(token){
        jwt.verify(token,"project",(err,decoded)=>{
            if(decoded){
                req.body.user = decoded.userid
                next()
            }else{
                res.send({ "msg": "Please wrong token" })
            }
        })
    }else{
        res.send({ "msg": "Please Login" })
    }
}
module.exports = {
    authoriser
}