const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');

const app = express();

//Built-in Middlewares
app.use(express.json());
app.use(cors());

//Test Routes
app.get('/', (req, res) => {
    res.json({
        success:true,
        message:'Doctor Appointment Booking Backend'
    })
});

const port = process.env.PORT || 6000;

app.listen(port, () => {
    console.log(`✅Server is running successfully on prot ${port}`)
});