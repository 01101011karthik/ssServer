const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const CORS = require('cors');
const cookieParser = require('cookie-parser');
const api = require('./api');

//config
dotenv.config({path: path.resolve(__dirname, '../.env')})
const port = process.env.PORT;
const dbCon = process.env.DB_CON;


//middlewares
app.use(CORS({
    origin: ['http://localhost:3000'],
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