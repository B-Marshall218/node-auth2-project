const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const token = req.headers.authorization;
    // console.log(token)

    const secret = process.env.JWT_SECRET || "I'll Keep your secret";

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            console.log(err, decodedToken)
            if (err) {
                res.status(401).json({ you: "Shall not pass" })
            } else {
                req.jwt = decodedToken;
                next()
            }
        })
    } else {
        res.status(401).json({ error: "get you a token fool" })
    }
}