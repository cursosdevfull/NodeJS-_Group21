function NotFound(_request, response) {
    response.writeHead(404, { "content-type": "text/plain" })
    response.write("Path not found")
    response.end()
}

module.exports = {NotFound}