const http = require("http")
const {handler} = require("./app")

const server = http.createServer(handler)

server.listen(3000, () => console.log("Server is running"))