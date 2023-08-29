const bcrypt = require("bcrypt");

const saltRounds = 10;

const myPlaintextPassword = 's0/\/\P4$$w0rD';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    if(err) {
        throw err;
    }
    console.log("hash - ",hash);

    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        if(err) {
            throw err;
        }
        console.log(result);
    });
});