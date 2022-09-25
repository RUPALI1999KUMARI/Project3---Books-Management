const jwt = require("jsonwebtoken");
const bookModel = require("../model/bookModel");


const authenticator = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({
                status: false,
                message: "token is not present",
            });
        }
        let decodedToken = jwt.verify(token, "project-3");
        if (decodedToken) {
            req.userId = decodedToken.userId;
            next();
        } else {
            return res
                .status(401)
                .send({ status: false, message: "Token is not valid" });
        }
    } catch (err) {

        return res.status(500).send({ status: false, mess: err.message });
    }
};


const authorization = async function (req, res, next) {
    try {

        let bookId = req.params.bookId
        if (bookId) {
            let user = await bookModel.findOne({ _id: bookId }).select({ userId: 1, _id: 0 })
            if (user) {
                if (req.userId == user.userId.toString()) {
                    next()
                } else {
                    return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })
                }
            } else {
                return res.status(400).send({ message: "book does not exist" })
            }
        }
    } catch (err) {
        return res.status(500).send({ msg: "ERROR", error: err.message })
    }
}
module.exports = { authenticator, authorization }