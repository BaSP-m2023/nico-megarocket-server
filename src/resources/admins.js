const express = require('express')
const adminsUser = require('../data/admins.json')
const fs = require('fs')
const router = express.Router ()

router.get ('/get', (req, res)=>{
    return res.send(adminsUser)
})

router.put ('/put/:id', (req, res)=>{
    const idParam = req.params.id
    const body = req.body
    // console.log (idParam)

    const search = adminsUser.find((admins) => admins.id === parseInt(idParam));
    // const search = adminsUser.find (element => {
    //    element.id===parseInt(idParam)
// })
    if (!search) {
        return res.status(404).send('User not found');
    }
    search.first_name=body.first_name
    search.last_name=body.last_name
    // search.email=body.email
    // search.address=body.address
    // search.phone=body.phone
    fs.writeFile('src/data/admins.json', JSON.stringify(adminsUser), (error) => {
        if (error) {
        return res.send('User cannot be edited');
        } else {
        return res.send('user has been edited');
        }
  });
})

module.exports=router