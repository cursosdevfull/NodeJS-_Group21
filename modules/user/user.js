const fs = require("fs")
const path = require("path")

function UserList(_request, response) {
    response.writeHead(200, { "content-type": "application/json" })
    response.write(JSON.stringify([{ user: "user01" }, { user: "user02" }, { user: "user03" }]))
    response.end()
}

function UserInsert(_request, response) {
    response.writeHead(204)
    response.end()
}

function UserVideo(_request, response) {
    response.writeHead(200, { "content-type": "video/mp4" })
    const stream = fs.createReadStream(path.join(__dirname, "../../Clase01.mp4"))
    stream.pipe(response)
}

function UserDetail(_request, response) {
    response.writeHead(200, { "content-type": "application/json" })
    response.end(JSON.stringify({
        name: "user name",
        lastname: "user lastname",
        age: 20,
        genre: "MALE"
    }))
}

module.exports = {
    UserList, UserInsert, UserDetail, UserVideo
}