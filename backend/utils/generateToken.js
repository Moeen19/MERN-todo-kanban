import jwt from "jsonwebtoken"
import Cookies from "universal-cookie"

const cookies = new Cookies();

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30d'
    })
    cookies.set('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/'
    })
}

export default generateToken;