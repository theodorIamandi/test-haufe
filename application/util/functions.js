const bcrypt = require("bcrypt");

const extractAuth = async function (userKey, param, type) {
    let auth = new Buffer.from(param, "base64").toString().split(":")
    let res =  {}

    res[userKey] = auth[0]

    let token = auth[1];

    if(type === "password")
        token = await hash(token)

    res[type] = token;
    return res;
}

const hash = function (password) {
    return new Promise(function(resolve, reject) {
        bcrypt.hash(password, process.env.SALT_KEY,(err, hash) => {
            resolve(hash)
        });
    }.bind(this))
}

const generateToken = function(key='') {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(10, "a",function(err, salt) {
            bcrypt.hash(key, salt, function(err, hash) {
                if(err) reject(err)
                resolve(hash)
            }.bind(this));
        }.bind(this));
    }.bind(this))
}

const safeObject = function (obj) {
    return JSON.parse(JSON.stringify(obj, function (key, value) {
        return (typeof value === 'bigint'
            ? parseInt(value.toString())
            : value)
    }))
};

module.exports = { extractAuth, hash, generateToken, safeObject }