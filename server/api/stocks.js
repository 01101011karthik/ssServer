const router = require('express').Router();
const request = require('request');
const { verifyToken } = require('../utils');

router.get('/', async (req, res) => {
    const {BASE_API_URL: baseurl} = process.env;
    const { authentication } = req.cookies;

    const {type, sortOrder, page} = req.query;

    const options = {
        url: `${baseurl}&type=${type ? type : 'USD'}&sortOrder=${sortOrder ? sortOrder : 'desc'}&page=${page ? page : 1}&limit=20`,
        json: true
    }

    console.log('options', options)
    console.log('authentication', authentication)


    try {
        request.get(options,(err, response, body) => {
            res.status(200).send({message: body})
        })
    }catch(err){
        console.log(err)
        res.status(500).send({message: `Something went wrong`})
    }


    // try {
    //     const legit = await verifyToken(authentication);
    //     console.log('legit', legit)
    //     if(legit){
    //         request.get(options,(err, response, body) => {
    //             res.status(200).send({message: body})
    //         })
    //     }else {
    //         res.status(400).send({message: `Bad request, login again`})
    //     }
    // }catch(err){
    //     console.log(err)
    // }
})

module.exports = router;