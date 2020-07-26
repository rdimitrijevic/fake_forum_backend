'use strict';

async function title_val(name) {
    if (typeof name !== 'string')
        throw Error('Invalid data type');

    const regex = /[\w ()\[\].,{}$&*<>@!%"':-]/gu;
    if (regex.test(name))
        return true;
    else
        throw Error('Invalid topic title format');
}


module.exports = {
    title_val
}