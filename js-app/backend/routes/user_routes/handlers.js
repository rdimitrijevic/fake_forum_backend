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
                        .add({
                            username: req.body.username,
                            password: hashed,
                            email: req.body.email,
                            gender: req.body.gender
                        });

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

    let check = bcrypt
                    .compareSync(password, user.password);

    if (!check) {
        res
        .status(400)
        .send({ error: "Wrong current password" });

        return;
    }
    

    let params = new Object();
    
    if('new_email' in req.body)
        params.email = req.body.new_email;

    if('new_password' in req.body)
        params.password = bcrypt.hashSync(
            req.body.new_password,
            bcrypt.genSaltSync(10)
        );


    user_services
    .update(id, params)
    .then(user => {
        if(user == null)
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