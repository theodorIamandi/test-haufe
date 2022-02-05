const express = require('express')
const jwt = require("jsonwebtoken");
const {extractAuth, generateToken, safeObject} = require("../util/functions");
const {register, tokenAuth, destroyAuthToken, authenticate} = require("../controllers/user");
const router = express.Router()

/* Create Session */
router.get('/auth',authenticate);

/* Create User */
router.post('/register', register);

/* Verify Session */
router.get('/token-auth', tokenAuth);

/* Destroy Session */
router.post('/destroy', destroyAuthToken);

module.exports = router;
