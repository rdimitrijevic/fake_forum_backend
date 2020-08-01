const { title_val } = require('./util/topics_validation_utils');

async function update_validation(req, res, next) {
    title_val(req.body.new_title)
    .then(next())
    .catch(err => {
        res
        .status(400)
        .send({ error: err.message });
    });
}

async function create_validation(req, res, next) {
    title_val(req.body.title)
        .then(next())
        .catch(err => {
            res
                .status(400)
                .send({ error: err.message });
        });
}

module.exports = {
    update_validation,
    create_validation
}