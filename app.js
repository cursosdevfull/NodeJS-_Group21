const { NotFound } = require("./modules/core/errors/not-found")
const {userRoutes} = require("./modules/user/routes")
const {fileRoutes} = require("./modules/file/routes")

const routes = {...userRoutes, ...fileRoutes}

const handler = (request, response) => {
    const { url, method } = request

    try {
        const methodToExecute = routes[url.toLowerCase()][method.toLowerCase()]
        console.log(new Date().toISOString())
        methodToExecute(request, response)
    } catch (error) {
        NotFound(request, response)
    }
}

module.exports = { handler }