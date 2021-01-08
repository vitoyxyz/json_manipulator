const fs = require('fs').promises

let obj = {}




module.exports = {

    createFile: function () {

        console.log('Create File!');

    },

    readFile: async function () {
        data = await fs.readFile('./json/intents.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            return JSON.stringify(data);
        })
        return data;
    },

    updateFIle: function () {

        console.log('Update File!')

    }

}