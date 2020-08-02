const post_services = require('../../services/post_services');

function create_handler(req, res) {
    let post_data = {
        content: req.body.content,
        parentTopic: req.params.topic_id,
        createdBy: req.user_id
    }

    post_services
        .create(post_data)
        .then(id => {
            if (id === false)
                res
                    .status(400)
                    .send({ error: 'Problem creating post' });
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

function get_by_topic_handler(req, res) {
    post_services.get_by_topic(req.params.topic_id)
        .then(posts => {
            res
                .status(200)
                .send(posts);
        })
        .catch(err => {
            res
                .status(400)
                .send({ error: err.message });
        });
}

function delete_handler(req, res) {
    post_services.remove(req.params.post_id)
        .then(deleted_id => {
            if (deleted_id != null)
                res
                    .status(204)
                    .send();
            else
                res
                    .status(404)
                    .send({ error: `Post with id ${req.params.post_id} doesn\'t exist` });
        })
        .catch(err => {
            res
                .status(400)
                .send({ error: err.message });
        });
}

function update_handler(req, res) {
    post_services.update(
        req.params.post_id,
        req.body.new_content
    )
        .then(topic => {
            if (topic != null)
                res
                    .status(200)
                    .send(topic);
            else
                res
                    .status(404)
                    .send({ error: `Post with id ${req.params.id} not found` });
        })
        .catch(err => {
            res
                .status(400)
                .send({ error: err.message });
        });
}

module.exports = {
    create_handler,
    delete_handler,
    update_handler,
    get_by_topic_handler
}