const {extractAuth, safeObject, generateToken} = require("../util/functions");
const jwt = require("jsonwebtoken");
const {findUnique, findUniqueToken} = require("../services/user");

const authenticate = async (req, res, next) => {
    let config = req.app.appConfig

    let auth = await extractAuth('email', req.headers['authorization'].split(' ')[1], 'password');

    let user = await findUnique(config, auth);

    if(user === null)
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(401);
        res.end();
    }
    else {
        let authToken = await config.prisma.authToken.create({
            data: {
                user_id: user.id,
                token: await generateToken(),
            }
        });

        const jwtToken = jwt.sign({role_id: user.role_id, user_id: user.id}, "SECRET!@#", {
            expiresIn: 1000 * 60 * 60 * 2
        });


        let resData = {
            token: authToken.token,
            jwtToken: jwtToken,
            user: {id: user.id, email: user.email, name: user.name}
        };

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(resData));
        next();
    }
}

const register = async (req, res, next) => {
    let config = req.app.appConfig

    let auth = await extractAuth('email', req.headers['authorization'].split(' ')[1], 'password');

    let user = safeObject(await config.prisma.user.create({
        data: {
            email: auth.email,
            name: req.body.name,
            password: auth.password,
            role_id: 1
        }
    }));

    let authToken =  await config.prisma.authToken.create({
        data: {
            user_id: user.id,
            token:  await generateToken(),
        }
    });

    const jwtToken = jwt.sign({ role_id: 1, user_id: user.id }, "SECRET!@#", {
        expiresIn: 1000 * 60 * 60 * 2,
    });

    let resData = {
        token: authToken.token,
        jwtToken: jwtToken,
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


    res.setHeader('Content-Type', 'application/json');

    if(token === null) {
        res.sendStatus(401);
        next();
    }
    else
    {
        res.end(JSON.stringify({}));
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