const User = require('./index');

function password_val(pass) {
    if (pass.length < 8)
        return false;
};

const passwordVal = {
    validator: password_val,
    message: 'Password validation failed!'
};


function username_val(usrname) {
    
    if( usrname < 6)
    return false;

    let p = await User.find({ username: usrname });
    
    if( p.username === usrname)
        return false;

};

const usernameVal = {
    validator: username_val,
    message: 'Username validation failed!'
};


function email_val(email) {
    let re = /\S+@\S+\.\S+/;
    if( email.length < 6 )
        return false;
    if( !re.test(email) )
         return false;
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