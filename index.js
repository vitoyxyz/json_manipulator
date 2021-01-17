const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()
const cors = require('cors');
const port = 3030

const jsonManipulator = require('./jsonManipulator');



const json_file = './json/intents.json'
const sorted_json_file = './json/sorted_intents.json'


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

    jsonFile = jsonManipulator.readFile(json_file)

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

    jsonManipulator.fileExists(json_file).then(el => {
        jsonFile = jsonManipulator.readFile(json_file)
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

            jsonManipulator.writeFile(json_file, JSON.stringify(writeJson))

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
    }).catch(err => {

        jsonManipulator.createFile(json_file, `{"intents": []}`).then().catch()
        jsonFile = jsonManipulator.readFile(json_file)

        jsonFile.then(data => {

            return JSON.parse(data)

        }).then(parsedJson => {

            parsedJson.intents.push(reqData)
            return parsedJson

        }).then(writeJson => {

            jsonManipulator.writeFile(json_file, JSON.stringify(writeJson))

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


    // return
})

// Go through all the elements and do the logic with context_set and context_filter

app.post('/implement_logic', (req, res) => {

    fileData = jsonManipulator.readFile(json_file);


    fileData.then(data => {
        if (data == '') {
            if (!res.headersSent) {
                res.status(500).json({
                    message: 'json File Is Empty'
                })
                return
            }
        }

        parsed = JSON.parse(data)

        if ('intents' in parsed && !parsed.intents.length == 0) {
            return parsed
        } else {
            res.status(500).json({
                message: 'No Data or Wrong JSON structure To Sort!'
            })
            return
        }


    }).then(data => {
        // Get all elements with proporty context_filter
        let res, parr, temp = [];
        for (let index = 0; index < data.intents.length; index++) {
            temp = []
            if ('context_filter' in data.intents[index]) {
                for (let index1 = 0; index1 < data.intents.length; index1++) {
                    if (data.intents[index].context_filter === data.intents[index1].context_set) {
                        parr = data.intents[index].patterns;
                        res = data.intents[index1].responses;
                        for (let i = 0; i < parr.length; i++) {
                            for (let j = 0; j < res.length; j++) {

                                temp.push(res[j] + ' ' + parr[i])

                            }
                        }
                    }
                }
                data.intents[index].patterns = temp;
            }
        }

        return data;

    }).then(writeJson => {
        jsonManipulator.fileExists(sorted_json_file).then(el => {

            jsonManipulator.writeFile(sorted_json_file, JSON.stringify(writeJson))

        }).catch(er => {

            jsonManipulator.createFile(sorted_json_file, JSON.stringify(writeJson)).then().catch()

        })


        res.status(200).json({
            message: 'Sorted!'
        })

    }).catch(err => {
        if (!res.headersSent) {
            console.log(err)
            res.status(500).json({
                err: 'Some thing went wrong!. Try again.'
            })
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})