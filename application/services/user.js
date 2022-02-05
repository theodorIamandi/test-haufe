const {safeObject} = require("../util/functions");


const findUnique = async (config, data) => {
    return safeObject(await config.prisma.user.findUnique({
        where: {
            email_password: {
                email: data.email,
                password: data.password
            }
        }
    }));
}

const findUniqueToken = async (config, data) => {
    return safeObject(await config.prisma.authToken.findUnique({
        where: {
            token_user_id: {
                token: data.token,
                user_id: data.user_id
            }
        }
    }));
}

module.exports = {findUnique, findUniqueToken}