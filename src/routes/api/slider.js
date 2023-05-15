const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

router.get('/', async (req, res) => {
    const posts = await loadPosts()
    res.send(await posts.find({}).toArray())
})

router.post('/', async (req, res) => {
    const posts = await loadPosts()
    await posts.insertOne({
        title: req.body.title,
        info: req.body.info
    })
    res.status(201).send()
})

router.delete('/:id', async (req, res) => {
    const posts = await loadPosts()
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadPosts(){
    const client = await mongodb.MongoClient.connect('mongodb+srv://artur:artur@cluster0.hq9um8x.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    return client.db('test').collection('slider')
}

module.exports = router