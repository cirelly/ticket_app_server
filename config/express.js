const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const customerRoutes = require('../routes/user.routes')
const cors = require('cors') 
const app = express();


//Config Header app
app.use(cors());

//routes
app.use('/api', customerRoutes)


module.exports = app;