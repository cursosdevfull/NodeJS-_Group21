const http = require("http")

const server = http.createServer((request, response) => {
    response.writeHead(200, {"content-type": "text/plain"})
    response.write("Hola")
    response.write("Este es el curso de NodeJs")
    response.end()
})

server.listen(3000, () => console.log("Server is running"))