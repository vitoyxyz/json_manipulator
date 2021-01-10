const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()
const cors = require('cors');
const port = 3030

const jsonManipulator = require('./jsonManipulator');
const {
    json,
    response
} = require('express')



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(cors({
    'allowedHeaders': ['Content-Type'],
    'origin': '*',
    'preflightContinue': true
}));



app.get('/', (req, res) => {

    jsonFile = jsonManipulator.readFile()

    jsonFile.then(data => {
        res.json({
            json: JSON.stringify(data)
        })

    }).catch(err => {
        res.json({
            message: err
        })
    })
})

app.post('/create_entry', (req, res) => {

    //tag*, response*, pattern*, context_filter, context_set
    reqData = req.body;
    if (reqData.tag == undefined || reqData.tag == null || reqData.tag == '') {

        res.status(400).send('Tag is required')

    }
    if (reqData.response == undefined || reqData.response == null || reqData.response == '') {

        res.status(400).send('Response is required')

    }
    if (reqData.pattern == undefined || reqData.pattern == null || reqData.pattern == '') {

        res.status(400).send('Response is required')

    }
    jsonFile = jsonManipulator.readFile()

    jsonFile.then(data => {

        return JSON.parse(data)

    }).then(parsedJson => {

        parsedJson.intents.push(reqData)
        return parsedJson

    }).then(writeJson => {

        jsonManipulator.writeFile(JSON.stringify(writeJson))

        res.status(200).json({
            message: 'Saved!'
        })

    }).catch(err => {
        if (!res.headersSent) {
            res.status(500).json({
                err: 'Some thing went wrong!. Try again.'
            })
        }

    })
})

// Go through all the elements and do the logic with context_set and context_filter

app.post('/implement_logic', (req, res) => {


})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})