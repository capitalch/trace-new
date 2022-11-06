const express = require('express')
const cors = require('cors')
const PORT = 81
const app = express()
server = app.listen(PORT, function () {
    console.log(`Listening on port ${server.address().port}`)
})

app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    res.end('Hello')
})