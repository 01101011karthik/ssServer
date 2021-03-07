const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CORS = require('cors');
const cookieParser = require('cookie-parser');
const api = require('./api');


app.get('/', (req, res) => {
    res.status(200).send({message: 'success'})
})

//config
dotenv.config({path: path.resolve(__dirname, '../.env')})
const port = process.env.PORT;
const dbCon = process.env.DB_CON;


//middlewares
app.use(CORS({
    origin: ['https://ss-stocks.herokuapp.com', 'http://localhost:3000'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())


//routes
app.use('/api', api);

//connections
app.listen(port, () => {
    console.log(`Listening at ${port}`)
    mongoose.connect(
        dbCon,
        {useUnifiedTopology: true, useNewUrlParser: true},
        () => console.log('Connected to database')
    )
})