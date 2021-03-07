const router = require('express').Router();
const request = require('request');
const { verifyToken } = require('../utils');

router.get('/', async (req, res) => {
    const {BASE_API_URL: baseurl} = process.env;
    const { authentication } = req.cookies;

    const {type, sortOrder, page} = req.query;

    const options = {
        url: `${baseurl}&type=${type}&sortOrder=${sortOrder}&page=${page}&limit=20`,
        json: true
    }

    console.log('options', options)
    console.log('authentication', authentication)


    try {
        const legit = await verifyToken(authentication);
        console.log('legit', legit)
        if(legit){
            request.get(options,(err, response, body) => {
                res.status(200).send({message: body})
            })
        }else {
            res.status(400).send({message: `Bad request, login again`})
        }
    }catch(err){
        console.log(err)
    }
})

module.exports = router;