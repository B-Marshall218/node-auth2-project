const bcryptjs = require("bcryptjs");

const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Users = require("../user/user-model.js");
const { isValid } = require("../user/user-service");

router.post("/register", (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                const token = makeJwt(user)
                res.status(201).json({ data: user, token })
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            });
    } else {
        res.status(400).json({
            message: "Please provide username and password "
        });
    };

});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({ username: username })
            .then(([user]) => {
                console.log("user", user)
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeJwt(user)
                    res.status(200).json({ message: "Welcome Chosen One", token })
                } else {
                    res.status(401).json({ message: "invalid crednetials" })
                }

            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            });
    } else {
        res.status(400).json({
            message: "please provide username and password"
        })
    }
});

function makeJwt(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department
    };

    const secret = process.env.JWT_SECRET || "I'll Keep your secret";
    const options = {
        expiresIn: "1h",
    }
    return jwt.sign(payload, secret, options);
}

module.exports = router;