const path = require("path")
const fs = require("fs")

function Download(_request, response) {
    response.writeHead(200, { "content-type": "application/pdf" })
    const stream = fs.createReadStream(path.join(__dirname, "../../manual.pdf"))
    stream.pipe(response)
}

module.exports = { Download }