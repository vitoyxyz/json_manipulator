const fs = require('fs').promises

module.exports = {

    createFile: async function (file_path, content) {

        return await fs.writeFile(file_path, content)
    },

    fileExists: async function (file_path) {

        return await fs.access(file_path)

    },

    readFile: async function (file_path) {

        return data = await fs.readFile(file_path, 'utf8')

    },

    writeFile: async function (file_path, file_content) {

        return await fs.writeFile(file_path, file_content)

    }


}