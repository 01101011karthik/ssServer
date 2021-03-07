const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const {API_SEC_KEY: apiKey} = process.env;
    const {email, name, password} = req.body;

    try{
        const {length} = await User.find({email: req.body.email});
        const hash = await bcrypt.hash(password, 10)
        const user = await new User({...req.body, password: hash});

        if(!!length){
            res.status(400).send({message: `${email} already exists`})
        }else {
            user.save((err, doc) => {
                if(err){
                    console.log(err)
                    res.status(500).send({message: 'Something went wrong while creating user'})
                }else {
                    jwt.sign({email, password: hash}, apiKey, (err, token) => {
                        if(err){
                            console.log(err)
                            res.status(500).send({message: 'Something went wrong while creating user'})
                        } else {
                            res.status(200).send({message: 'success', authentication: token})
                        }
                    })
                }
            })
        }

    }catch(err){
        console.log(err)
        res.status(500).send({message: 'Something went wrong while creating user'})
    }
})

router.post('/login', async (req, res) => {
    const {API_SEC_KEY: apiKey} = process.env;
    const {email, password} = req.body;
    
    try {
        const user = await User.find({email: email});

        if(!user.length){
            res.status(400).send({message: `${email} doesn't exist`})
        } 
        else{
            const {password: hashedPass} = user[0];
            const legit = await bcrypt.compare(password, hashedPass);

            if(legit){
                jwt.sign({email, password: hashedPass}, apiKey, (err, token) => {
                    if(err){
                        console.log(err)
                        res.status(500).send({message: 'Something went wrong while logging user'})
                    } else {
                        res.status(200).send({message: 'success', authentication: token})
                    }
                })
            }else {
                res.status(400).send({message: 'Incorect password or username'});
            }
        }

    }catch(err){
        console.log(err)
        res.status(500).send({message: 'Something went wrong while logging user'})
    }
})

module.exports = router;