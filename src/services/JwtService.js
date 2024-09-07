const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const generalAccessToken = (payload) => {
    const access_token = jwt.sign({
        ...payload
    },
    process.env.ACCESS_TOKEN,
    {
        expiresIn: '30s'
    })

    return access_token
}

const generalRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, 
    process.env.REFRESH_TOKEN, 
    {
        expiresIn: '365d'
    })

    return refresh_token
}

const refreshTokenJwtService = (token) => {
    return new Promise(async (resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
            if(err) {
                resolve({
                    status: 'ERR',
                    message: 'The authemcation'
                })
            }
            const access_token = await generalAccessToken({
                id: user?.id,
                isAdmin: user?.isAdmin
            })

            resolve({
                status: 'OK',
                message: 'Get user Success',
                access_token
            })
        })
    })
}

module.exports = {
    generalAccessToken, 
    generalRefreshToken,
    refreshTokenJwtService
}
