
function password_val(pass) {
    if (pass.length < 8)
        return false;
    return true;
};

const passwordVal = {
    validator: password_val,
    message: 'Password validation failed!'
};


function username_val(usrname) {

    if (usrname.length < 6)
        return false;

    let re = /^\d+$/gm;
    if (re.test(usrname.trim().replace(" ", "")))
        return false;

    return true;
};

const usernameVal = {
    validator: username_val,
    message: 'Username validation failed!'
};


function email_val(email) {
    let re = /\S+@\S+\.\S+/;
    if (email.length < 6)
        return false;
    if (!re.test(email))
        return false;

    return true;
};

const emailVal = {
    validator: email_val,
    message: 'Email validation failed!'
}

module.exports = {
    passwordVal,
    usernameVal,
    emailVal
};