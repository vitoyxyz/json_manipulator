const fs = require('fs').promises

module.exports = {

    createFile: async function (content) {

        return await fs.writeFile('./json/intents.json', content)
    },

    fileExists: async function () {

        return await fs.access('./json/intents.json')

    },

    readFile: async function () {
        return data = await fs.readFile('./json/intents.json', 'utf8')
    },

    writeFile: async function (file_content) {

        return await fs.writeFile('./json/intents.json', file_content)

    }


}