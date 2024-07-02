import jwt from "jsonwebtoken"

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30d'
    })
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        same_site: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/'
    })
}

export default generateToken;