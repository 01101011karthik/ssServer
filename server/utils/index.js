const jwt = require('jsonwebtoken');
const User = require('../models/user')

async function verifyToken(a){
    const {API_SEC_KEY: apiSec} = process.env;
    try{
        const {email, password} = await jwt.verify(a, apiSec);
        const {length} = await User.find({email, password});

        if(!!length) return true;
        else return false;
    }catch(err){
        console.log(err)
        return false;
    }
}

module.exports.verifyToken = verifyToken;