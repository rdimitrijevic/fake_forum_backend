const topic_services = require('../../services/topic_services');

function update_handler(req, res) {
    topic_services.update(
        req.params.id,
        req.body.new_title
    )
        .then(topic => {
            res
                .status(200)
                .send(topic);
        })
        .catch(err => {
            res
                .status(400)
                .send({ error: err.message });
        });
}

function get_all_handler(req, res) {
    topic_services.get_all()
        .then(topics => {
            res
                .status(200)
                .send(topics);
        })
        .catch(err => {
            res
                .status(400)
                .send({ error: err.message });
        });
}

async function create_handler(req, res) {
    let topic_data = {
        title: req.body.title,
        createdBy: req.user_id
    }

    topic_services
        .create(topic_data)
        .then(id => {
            if (id === false)
                res
                    .status(400)
                    .send({ error: 'Problem creating topic' });
            else
                res
                    .status(201)
                    .send({ new_id: id });
        })
        .catch(err => {
            res
                .status(400)
                .send({ error: err.message });
        });
}

function get_by_user_handler(req, res) {
    topic_services.get_by_user(req.params.user_id)
        .then(topics => {
            res
                .status(200)
                .send(topics);
        })
        .catch(err => {
            res
                .status(400)
                .send({ error: err.message });
        });
}

module.exports = {
    get_by_user_handler,
    get_all_handler,
    update_handler,
    create_handler
}