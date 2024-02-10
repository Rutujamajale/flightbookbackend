const express = require('express');
const cors= require('cors');
const flightRouter=require('./routes/flightRouter');
const BookingRouter=require('./routes/BookingRouter');
const UserRouter=require('./routes/UserRouter')
const app = express();

app.use(cors());

const connection = require("./config/dbs");
app.use(express.json());

app.use('/booking',flightRouter);
app.use('/booking',BookingRouter);
app.use('/booking',UserRouter)




app.listen(5000,async()=>{
    try {
        await connection;
        console.log('Connected to Db');
    } catch (error) {
        console.log('Something went wrong at cooncting the database',error);
    }
    console.log('Running on port 5000');
});


