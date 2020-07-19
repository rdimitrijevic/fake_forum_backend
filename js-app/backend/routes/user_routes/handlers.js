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
        .status(400)
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

module.exports = {
    register_handler,
    login_handler
}