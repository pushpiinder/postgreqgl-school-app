import bcrypt from "bcrypt";

const saltRounds = 10;

export const hash = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err) {
                reject(err);
            }
            resolve(hash);
        });
    });
};

export const compare = async (hash, userInput) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(userInput, hash, function(err, result) {
            if(err) {
                reject(err);
            }
            resolve(result);
        });
    })
};

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     if(err) {
//         throw err;
//     }
//     console.log("hash - ",hash);

//     bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//         if(err) {
//             throw err;
//         }
//         console.log(result);
//     });
// });