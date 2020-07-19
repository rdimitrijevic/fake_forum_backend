const { username_val, password_val, email_val, gender_val } = require('./util/users_validation_utils');

async function register_validation(req, res, next) {
    let user_val = username_val(req.body.username);
    let pass_val = password_val(req.body.password);
    let mail_val = email_val(req.body.email);
    let gend_val = gender_val(req.body.gender);

    let result = await Promise.all(
        [user_val,
         pass_val,
         mail_val,
         gend_val]
    ).catch(err => console.log(err));

    for (var i = 0; i < result.length; i++) {
        if('error' in result[i]){
            res
            .status(400)
            .send({ error: result[i]['error'] });

            return;
        }
    }

    next();
}


async function login_validation(req, res, next) {
    let user_val = username_val(req.body.username);
    let pass_val = password_val(req.body.password);

    let result = await Promise.all(
        [user_val,
         pass_val]
    ).catch(err => console.log(err));

    for (var i = 0; i < result.length; i++) {
        if('error' in result[i]){
            res
            .status(400)
            .send({ error: result[i]['error'] });

            return;
        }
    }

    next();
}

module.exports = {
    login_validation,
    register_validation
}