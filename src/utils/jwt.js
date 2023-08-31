var jwt = require('jsonwebtoken');

export const sign = (payload) => {
    return  jwt.sign(
        { 
            exp: Math.floor(Date.now() / 1000) + (60 * 60), 
            ...payload,
        }, 
        process.env.JWT_SECRET
    )
}

export const verify = (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return DataTransfer;
    } catch (e) {
        console.error(e);
        return false;
    }
    
}