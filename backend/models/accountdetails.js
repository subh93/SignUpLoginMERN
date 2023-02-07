const mongoose = require('mongoose')

const accountdetailsSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String }
}, { timestamp: true, versionKey: false })

module.exports = mongoose.model('accountdetails', accountdetailsSchema)