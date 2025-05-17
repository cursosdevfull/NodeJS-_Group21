const { Download } = require("./file")

const routes = {
    "/download": {
        "get": Download
    }
}

module.exports = { fileRoutes: routes }