var jwt = require('jsonwebtoken');

const jwtSecret = '!@$@#$#@#$%#$@#@#$@#%@#$';

var token = jwt.sign(
    { 
        exp: Math.floor(Date.now() / 1000) + (60 * 60), 
        accessLevel: "admin",
        user: "admin@test.com" 
    }, 
    jwtSecret
);

console.log(token);

const isVerified = jwt.verify(token, jwtSecret);

console.log("isVerified", isVerified);