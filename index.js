const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()
const cors = require('cors');
const port = 3030

const jsonManipulator = require('./jsonManipulator');
const {
    json
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
    if (!'tag' in reqData && reqData.tag == undefined || reqData.tag == null || reqData.tag == '') {


        if (!res.headersSent) {

            res.status(400).send('Tag is required')
            return
        }
    }
    if (!'responses' in reqData && reqData.responses.length == 0) {
        if (!res.headersSent) {

            res.status(400).send('Response is required')
            return

        }
    }
    if ('patterns' in reqData && reqData.patterns.length == 0) {

        if (!res.headersSent) {

            res.status(400).send('Pattern is required')
            return

        }
    }
    if (reqData.context_set == undefined || reqData.context_set == null || reqData.context_set == '') {

        delete reqData.context_set

    }
    if (reqData.context_filter == undefined || reqData.context_filter == null || reqData.context_filter == '') {

        delete reqData.context_filter

    }

    jsonManipulator.fileExists().then().catch(err => {

        jsonManipulator.createFile(`{"intents": []}`).then().catch()
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
                console.log(err)
                res.status(500).json({
                    err: 'Some thing went wrong!. Try again.'
                })
            }

        })
        return
    })

    jsonFile = jsonManipulator.readFile()
    jsonFile.then(data => {
        if (data == '') {
            obj = {
                intents: []
            }
            return obj
        } else {
            return JSON.parse(data)
        }

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
            console.log(err)
            res.status(500).json({
                err: 'Some thing went wrong!. Try again.'
            })
        }

    })
    // return
})

// Go through all the elements and do the logic with context_set and context_filter

// app.post('/implement_logic', (req, res) => {

//     fileData = jsonManipulator.readFile();

//     fileData.then(data => {
//         return JSON.parse(data)
//     }).then(data => {
//         console.log(data)
//         if (!data == '' || !'intents' in data) {
//             // Get all elements with proporty context_filter
        






//             console.log(context_filter_data)
//         }

//     })





// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})