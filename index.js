require('dotenv').config();
require('./config/db')
const app = require('./config/express')
const port = process.env.PORT || 4000
app.listen(port, '0.0.0.0', ()=> {
    console.log("server on port: ", port);
})