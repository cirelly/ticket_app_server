const mongoose = require('mongoose')
const {MONGO_DATABASE, MONGO_USER, MONGO_PASSWORD} = process.env;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.dj8m1.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

try {
    mongoose.connect(MONGO_URI, mongooseOptions)
    return console.log('db connected')
    
} catch (error) {
    
    console.log(error);
    
    throw error
}
