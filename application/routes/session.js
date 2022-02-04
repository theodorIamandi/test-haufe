const express = require('express')
const jwt = require("jsonwebtoken");
const router = express.Router()

/* Create Session */
router.get('/create', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');

    const token = jwt.sign({ id: 2323 }, "SECRET!@#", {
        expiresIn: 86400
    }, () => {  });

    res.end(JSON.stringify({token: token}));
});

/* Destroy Session */
router.post('/destroy', (req, res, next) => {
    let token = req.body.token
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({test: "test"}));
});

module.exports = router;
