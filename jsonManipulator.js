const fs = require('fs').promises

let obj = {}




module.exports = {

    createFile: function () {

        console.log('Create File!');

    },

    readFile: async function () {
        return data = await fs.readFile('./json/intents.json', 'utf8')
    },

    updateFIle: function () {

        console.log('Update File!')

    }

}