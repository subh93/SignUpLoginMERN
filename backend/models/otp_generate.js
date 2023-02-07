const mongoose = require('mongoose')

const otpgenerateSchema = mongoose.Schema({
    otp: { type: String },
    authToken: { type: String }
}, { timestamp: true, versionKey: false })

module.exports = mongoose.model('otpgenerate', otpgenerateSchema)