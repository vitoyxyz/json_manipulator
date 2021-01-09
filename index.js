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

    res.json({
        json: 0
    })

})

app.get('/get_json_file', (req, res) => {

    jsonFile = jsonManipulator.readFile()

    jsonFile.then(data => {
        res.json({
            json: JSON.stringify(data)
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
        if (reqData.context_filter != undefined && reqData.context_filter != null && reqData.context_filter != '') {
            // find the elements with same context_set as the context_filter of the request,
            // get their response and pattern and you append them, together and add them to the
            // pattern of the new entry.
            arr_context_set = parsedJson.intents.filter(obj => {

                return obj.context_set == reqData.context_filter


            })

            // console.log(arr_context_set)

            new_pattern = [];
            arr_context_set[0].patterns.forEach(pattern => {
                arr_context_set[0].responses.forEach(response => {
                    str = response + pattern;
                    // console.log(str)
                    new_pattern.push(str)
                })
            });
            // console.log(new_pattern);

            new_obj = {
                tag: reqData.tag,
                patterns: new_pattern,
                responses: reqData.response,
                context_set: reqData.context_set,
                context_filter: reqData.context_filter

            }
            parsedJson.intents.push(new_obj)
            return parsedJson
        } else {

            new_obj = {
                tag: reqData.tag,
                patterns: reqData.pattern,
                responses: reqData.response,
                context_set: reqData.context_set,
            }

            parsedJson.intents.push(new_obj)
            return parsedJson
        }
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