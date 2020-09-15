const user_services = require('../../services/user_services');
const utils = require('../../auth/auth_util');

async function register_handler(req, res) {
    let hashed = utils.hash_password(req.body.password);

    let result = await user_services
        .add({
            username: req.body.username,
            password: hashed,
            email: req.body.email,
            gender: req.body.gender
        });

    if (result === false) {
        res
            .status(400)
            .send({ error: 'Unable to add user' });
    } else {
        res
            .status(201)
            .send({ new_user_id: result });
    }
}

async function login_handler(req, res) {

    let user_auth = {
        username: req.body.username,
        password: req.body.password
    };

    let result = null;

    try {
        result = await user_services
            .get_by_username(user_auth.username);
    } catch (error) {
        res
            .status(400)
            .send({ error: error.message });
    }

    if (result == null) {
        res
            .status(404)
            .send({ error: "User not found" });

        return;
    }

    let compare = utils.compare_password(
        user_auth.password,
        result.password
    );

    if (compare) {
        const token = utils.create_token(result._id, '2h');

        res
            .status(200)
            .send({
                username: user_auth.username,
                token: token,
                expiresIn: '2h'
            });

    } else {
        console.log('Incorrect password');

        res
            .status(400)
            .send({ error: "Incorrect password" });
    }
}

async function update_handler(req, res) {
    const password = req.body.password;
    const id = req.user_id;

    let user = null

    try {
        user = await user_services
            .get_by_id(id);
    } catch (error) {
        console.log(error.message);
    }

    if (user == null) {
        res
            .status(404)
            .send({ error: "Requested user not found" });

        return;
    }

    let check = utils
        .compare_password(password, user.password);

    if (!check) {
        res
            .status(400)
            .send({ error: "Wrong current password" });

        return;
    }


    let params = {};

    if ('new_email' in req.body)
        params.email = req.body.new_email;

    if ('new_password' in req.body)
        params.password = utils
            .hash_password(req.body.new_password);


    user_services
        .update(id, params)
        .then(user => {
            if (user == null)
                res
                    .status(400)
                    .send({ error: 'Update unsuccessful' });
            else
                res
                    .status(200)
                    .send({ updated_id: user._id });
        })
        .catch(err => {
            res
                .status(400)
                .send({ error: err.message });
        });
}

module.exports = {
    register_handler,
    login_handler,
    update_handler
}