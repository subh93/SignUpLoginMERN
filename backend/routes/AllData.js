const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const ShowAllData = require('../models/accountdetails')
const SaveOTP = require('../models/otp_generate')

const jwtsecreat = "mynameissubhashisdas"

router.post('/loginUser', async (req, res) => {
    const { email, password } = req.body;
    const generateotp = () => {
        let digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }

    await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'soledad.schimmel6@ethereal.email',
            pass: 'GhcdcZjxm4GcX4w1yD'
        }
    });
    try {
        const loginuser = await ShowAllData.findOne({ email });
        if (!loginuser) {
            return res.status(400).json({ errors: "Please enter the correct credentials" })
        }
        else {
            const pwdcompare = await bcrypt.compare(password, loginuser.password)
            if (!pwdcompare) {
                return res.status(200).json({ errors: "Please enter the valid password" })
            }
            else {
                const data = {
                    accountdetails: {
                        _id: loginuser._id
                    }
                }
                const authToken = jwt.sign(data, jwtsecreat)
                const finalOTP = generateotp()

                await SaveOTP.create({
                    otp: finalOTP,
                    authToken: authToken
                })

                await transporter.sendMail({
                    from: '"Fred Foo 👻" <retta.jacobson@ethereal.email>', // sender address
                    to: "bar@example.com, baz@example.com", // list of receivers
                    subject: "OTP for login", // Subject line
                    text: finalOTP, // plain text body
                    // html: "<b>Hello world?</b>", // html body
                  });

                return res.status(200).json({ success: true, authToken: authToken, otp: finalOTP})
            }
        }
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

router.post('/createUser', async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    let securepassword = await bcrypt.hash(password, salt)
    try {
        await ShowAllData.create({
            name: name,
            email: email,
            password: securepassword
        })
        res.send('User Registered Successfully')
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

router.post('/otpmatch', async(req,res)=>{
    const {otp, authToken} = req.body;
    try {
        const confirm = await SaveOTP.findOne({authToken, otp})
        if(!confirm){
            return res.status(200).json({ errors: "Please enter the correct OTP" })
        }
        else{
            await SaveOTP.findOneAndDelete({authToken, otp})
            return res.status(400).json({message: "record deleted"})
        }
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

router.delete('/removeaccount', async(req,res)=>{
    const {_id,name} = req.body;
    try {
        await ShowAllData.findOneAndDelete({_id,name})
        return res.status(400).json({message: "Account Deleted"})
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})

router.post('/getthename', async(req,res)=>{
    const {_id} = req.body;
    try {
        let showname = await ShowAllData.findOne({_id})
        return res.status(400).json({message: showname.name})
    } catch (error) {
        return res.status(400).json({ message: error })
    }
})
module.exports = router;