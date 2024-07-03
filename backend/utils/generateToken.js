import jwt from "jsonwebtoken"

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30d'
    })
    let domain;
    if (process.env.NODE_ENV === 'development') {
        // Production environment (Vercel frontend and Railway backend)
        if (process.env.NEXT_PUBLIC_VERCEL_URL.includes('vercel.app')) {
            domain = '.vercel.app';
        } else if (process.env.NEXT_PUBLIC_VERCEL_URL.includes('up.railway.app')) {
            domain = '.up.railway.app';
        }
    } else {
        // Local development environment
        domain = 'localhost';
    }
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        domain: domain,
        path: '/'
    })
}

export default generateToken;