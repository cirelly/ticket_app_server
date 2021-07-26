const express = require('express');
const morgan = require('morgan');
const customerRoutes = require('../routes/user.routes')
const cors = require('cors') 
const job = require('../jobs/jobs')
const app = express();

app.use(morgan('dev'));
//Config Header app
app.use(cors());

//ejecutamos el cron en la aplicacion
job.jobQueue()
app.use(express.json());
//routes
app.use('/api', customerRoutes)


module.exports = app;