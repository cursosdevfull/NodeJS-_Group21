const http = require("http")
const fs = require("fs")
const {handler} = require("./app")

const options = {
    key: fs.readFileSync("./certificates/curso-nodejs21.pem"),
    cert: fs.readFileSync("./certificates/curso-nodejs21.cert")
}

const server = http.createServer(options, handler)

server.listen(443, () => console.log("Server is running"))