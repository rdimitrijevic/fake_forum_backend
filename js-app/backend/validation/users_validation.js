const { username_val, password_val, email_val, gender_val } = require('./util/users_validation_utils');

function register_validation(req, res, next) {
    let user_val = username_val(req.body.username);
    let pass_val = password_val(req.body.password);
    let mail_val = email_val(req.body.email);
    let gend_val = gender_val(req.body.gender);

    Promise.all([
        user_val,
        pass_val,
        mail_val,
        gend_val
    ])
    .then( (_) => next() )
    .catch(err => {
        res
        .status(400)
        .send({ error: err.message });
    });

}


function login_validation(req, res, next) {
    let user_val = username_val(req.body.username);
    let pass_val = password_val(req.body.password);

    Promise.all([
        user_val,
        pass_val
    ])
    .then( (_) => next() )
    .catch(err => {
        res
        .status(400)
        .send({ error: err.message });
    });
}

function update_validation(req, res, next) {
    let validations = [];

    if ('new_email' in req.body)
        validations.push(email_val(req.body.new_email));

    if ('new_password' in req.body)
        validations.push(password_val(req.body.new_password));

    validations.push(password_val(req.body.password));

    Promise.all(validations)
    .then((_) => { next() })
    .catch(err => {
        res
        .status(400)
        .send({ error: err.message });
    });
}

module.exports = {
    login_validation,
    register_validation,
    update_validation
}