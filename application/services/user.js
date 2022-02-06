const {generateToken} = require("../util/functions");
const jwt = require("jsonwebtoken");
const {findUniqueRecord, createRecord} = require("./record");


const findUniqueUser = async (config, data) => {
    return await findUniqueRecord(config,"user",{
        email_password: {
            email: data.email,
            password: data.password
        }
    });
}

const findUniqueToken = async (config, data) => {
    return await findUniqueRecord(config, "authToken",{
        token_user_id: {
            token: data.token,
            user_id: data.user_id
        }
    });
}

const createAuthToken = async (config, userId) => {
    return await createRecord(config,{
        entity: 'authToken',
        payload: {
            user_id: userId,
            token: await generateToken(),
        }
    });
}

const createTokens = async (config, userId, payload) => {
    let authToken = await createAuthToken(config, userId)
    const jwtToken = jwt.sign(payload, "SECRET!@#", {
        expiresIn: 1000 * 60 * 60 * 24 * 90
    });

    return {
        jwtToken: jwtToken,
        token: authToken.token
    }
}

module.exports = {findUniqueUser, findUniqueToken, createAuthToken, createTokens}