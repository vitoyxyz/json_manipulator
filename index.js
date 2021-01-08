const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 3030

const jsonManipulator = require('./jsonManipulator');


app.use(bodyParser.json())


app.get('/', (req, res) => {
    // jsonManipulator.createFile();
    // let data = jsonManipulator.readFile();
    console.log(jsonManipulator.readFile().then(data => console.log(data)));
    res.json({
        json: 0
    })

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})