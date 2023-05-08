const express = require('express')
const adminsUser = require('../data/admins.json')
const router = express.Router ()

router.get ('/get', (req, res)=>{
    return res.send(adminsUser)
})

module.exports=router