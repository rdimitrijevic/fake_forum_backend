'use strict';

function topicTitle(name) {
    const regex = /[\w ()\[\].,{}$&*<>@!%"':-]/gu;
    return regex.test(name);
}

const titleVal = {
    validator: topicTitle,
    message: "Title contains forbiden characters"
}

module.exports = {
    titleVal
}