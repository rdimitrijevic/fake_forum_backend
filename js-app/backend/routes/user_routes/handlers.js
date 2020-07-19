const user_services = require('../../services/user_services');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function register_handler(req, res) {
    let salts = bcrypt.genSaltSync(10);
    let hashed = bcrypt.hashSync(
        req.body.password,
        salts
    );

    let result = await user_services
                        .add(
                            req.body.username,
                            hashed,
                            req.body.email,
                            req.body.gender
                        );

    if( result == false ) {
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

    let result = await user_services
                        .get_by_username(user_auth.username);

    if (result == null) {
        res
        .status(404)
        .send({ error: "User not found" });

        return;
    }

    let compare = bcrypt.compareSync(
        user_auth.password,
        result.password
    );
    
    if(compare) {
        const token = jwt.sign(
            { id: result._id },
            'skript2020',
            { expiresIn: '2h' }
        );

        res
        .status(200)
        .send({
            access_token: token,
            expiresIn: '2h'
        });
    
    } else {
        console.log('Incorrect password');

        res
        .status(400)
        .send({ error: "Incorrect password" });
    }
}

async function change_password(req, res) {
    const password = req.body.password;
    const new_password = req.body.new_password;

    const id = req.params.id;

    try {
        let user = await user_services
                                    .get_by_id(id);
    } catch (error) {
        console.log(error);
    }

    if (user === null) {
        res
        .status(404)
        .send({ error: "Requested user not found" });

        return;
    }

    let check = bcrypt
                    .compareSync(password, user.password);

    if (!check) {
        res
        .status(400)
        .send({ error: "Wrong current password" });

        return;
    }

    
}

module.exports = {
    register_handler,
    login_handler
}