const express = require('express')
const mongodb = require('mongodb')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const router = express.Router()

router.post('/', async (req, res) => {
    try{
        const users = await loadPosts()
        const userPassword = await bcrypt.hash(req.body.password, 8)
        const token = jwt.sign({mail: req.body.mail}, "secretKey", {})
        await users.insertOne({
            token: token,
            name: req.body.name,
            mail: req.body.mail,
            password: userPassword
        })
        res.status(201).send()
    } catch (e) {
        res.send({message: "Server error"})
    }
})

router.get('/', async (req, res) => {
    const users = await loadPosts()
    const mail = req.query.mail
    const user = await users.findOne({mail})
    if(user){
        const token = jwt.sign({id: user._id}, "secretKey", {})
        const decoded = jwt.verify(token, 'secretKey');
        console.log(decoded)
        return res.json({
            token,
            user: {
                id: user._id,
                mail: user.mail,
                name: user.name
            }
        })
    } else {
        return res.status(404).json({message: "User not found"})
    }
})

async function loadPosts(){
    const client = await mongodb.MongoClient.connect('mongodb+srv://artur:artur@cluster0.hq9um8x.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    return client.db('test').collection('users')
}

module.exports = router