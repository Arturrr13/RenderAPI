const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = require('./routes/api/posts')
app.use('/api/posts', posts)

const slider = require('./routes/api/slider')
app.use('/api/slider', slider)

const select = require('./routes/api/select')
app.use('/api/select', select)

const team = require('./routes/api/ourteam')
app.use('/api/ourteam', team)

const circular = require('./routes/api/circular')
app.use('/api/circular', circular)

const users = require('./routes/api/users')
app.use('/api/users', users)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5050

app.listen(port, () => console.log('GG'))