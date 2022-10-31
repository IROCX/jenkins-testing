var express = require('express')
var app = express()

var cors = require('cors')

// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(cors())

require('dotenv').config();
var { getDataFromS3, s3download } = require('./services/s3.service')

app.get('/', async (req, res) => {
    const fileContent = await getDataFromS3()
    res.send(fileContent)
})

app.listen(3000, () => {
    console.log("listening to port 3000")
})


