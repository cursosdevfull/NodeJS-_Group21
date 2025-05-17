const { UserList, UserInsert, UserDetail, UserVideo } = require("./user")

const routes = {
    "/user": {
        "get": UserList,
        "post": UserInsert
    },
    "/user/video": {
        "get": UserVideo
    },
    "/user/detail": {
        "get": UserDetail
    }
}

module.exports = {userRoutes: routes}