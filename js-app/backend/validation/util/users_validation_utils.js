
async function password_val(pass) {
    if (typeof pass !== 'string') {
        throw Error('Invalid password data type');
    }

    if (pass.length < 8)
        throw Error('Password too short');

    return true;
}

async function username_val(usrname) {
    let re = /^\d+$/gm;

    if (typeof usrname !== 'string') {
        throw Error('Invalid username data type');
    }

    if (re.test(usrname.trim().replace(" ", ""))) {
        throw Error('Invalid username format');
    }

    if (usrname.length < 6)
        throw Error('Username too short');

    return true;
}


async function email_val(email) {
    let re = /\S+@\S+\.\S+/;

    if (typeof email !== 'string')
        throw Error('Invalid email data type');

    if (!re.test(email))
        throw Error('Invalid email format');
    
    if (email.length < 6)
        throw Error('Email too short');

    return true;
}

async function gender_val(gender) {
    if (typeof gender !== 'string')
        throw Error('Invalid gender data type');

    if (gender.toLowerCase() !== 'male'
        && gender.toLowerCase() !== 'female')
            throw Error('Invalid gender format');

    return true;
}


module.exports = {
    username_val,
    email_val,
    gender_val,
    password_val
};