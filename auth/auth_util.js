const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const key = 'skript2020';

function hash_password(value) {
    let salts = bcrypt.genSaltSync(10);
    let hashed = bcrypt.hashSync(
        value,
        salts
    );

    return hashed;
}

function compare_password(incoming,stored) {
    return bcrypt.compareSync(
        incoming,
        stored
    );
}

function create_token(id, time) {
    return jwt.sign(
        { id: id },
        key,
        { expiresIn: time }
    );
}

function verify_token(token) {
    try {
        return jwt.verify(
            token,
            key
        );
    } catch (error) {
        throw error;
    }

}

module.exports = {
    hash_password,
    compare_password,
    create_token,
    verify_token
}
