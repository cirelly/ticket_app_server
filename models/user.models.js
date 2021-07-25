const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSupportSchema = Schema({
    userId: {
        type: Number,
        unique: true
    },
    userName: String,
    queueNumber: Number,
    supportTimestamp: Number,
    attended: Boolean
    },
    { timestamps: true }
)

module.exports = mongoose.model("customer_schema", CustomerSupportSchema)