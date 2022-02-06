const {extractAuth, safeObject, generateToken} = require("../util/functions");
const jwt = require("jsonwebtoken");
const {findUniqueToken, createTokens, findUniqueUser} = require("../services/user");
const {findUniqueRecord, createRecord} = require("../services/record");

const authenticate = async (req, res, next) => {
    let config = req.app.appConfig
    let auth = await extractAuth('email', req.headers['authorization'].split(' ')[1], 'password');

    let user = await findUniqueUser(config, auth);

    if(user === null) {
        res.setHeader('Content-Type', 'application/json');
        res.status(401);
        res.end();
    }
    else {
        let role = await findUniqueRecord(config, 'role', {id: user.role_id });
        let tokens = await createTokens(config, user.id, {
            user_id: user.id,
            acl: JSON.parse(role.acl)
        })

        let resData = {
            token: tokens.token,
            jwtToken: tokens.jwtToken,
            acl: JSON.parse(role.acl),
            user: {id: user.id, email: user.email, name: user.name, acl: JSON.parse(role.acl)}
        };
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(resData));
        next();
    }
}

const register = async (req, res, next) => {
    let config = req.app.appConfig

    let auth = await extractAuth('email', req.headers['authorization'].split(' ')[1], 'password');

    let user = await createRecord(config,{
        entity: "User",
        payload: {
            email: auth.email,
            name: req.body.name,
            password: auth.password,
            role_id: 1
        }
    });

    let role = await findUniqueRecord(config, 'role', {id: user.role_id });
    let tokens = await createTokens(config, user.id, {
        user_id: user.id,
        acl: JSON.parse(role.acl)
    })

    let resData = {
        token: tokens.token,
        jwtToken: tokens.jwtToken,
        acl: JSON.parse(role.acl),
        user: { id: user.id, email: user.email, name: user.name }
    };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(resData));
    next();
}

const tokenAuth = async (req, res, next) => {
    let config = req.app.appConfig
    let decodedJwt = jwt.verify(req.headers['x-jwt'], "SECRET!@#", {});


    let token = await findUniqueToken(config, {
        token: req.headers['authorization'].split(" ")[1],
        user_id: decodedJwt.user_id,
    });

    let user = await findUniqueRecord(config, 'user', {
        id: decodedJwt.user_id});

    let resData = {
        acl: decodedJwt.acl,
        user: { id: user.id, email: user.email, name: user.name }
    };

    res.setHeader('Content-Type', 'application/json');

    if(token === null) {
        res.sendStatus(401);
        next();
    }
    else
    {
        res.end(JSON.stringify(resData));
        next();
    }

    res.end();
}

const destroyAuthToken = async (req, res, next) => {
    let config = req.app.appConfig

    let decodedJwt = jwt.verify(req.headers['x-jwt'], "SECRET!@#", {});

    let authToken = await findUniqueToken(config, {
        token: req.headers['authorization'].split(" ")[1],
        user_id: decodedJwt.user_id,
    });

    const deleteUser = await config.prisma.authToken.delete({ where: { id: authToken.id } })


    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({disconnected: true}));
}

module.exports = { register, tokenAuth, destroyAuthToken, authenticate }