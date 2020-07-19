'use-strict';
const Users = require('../models/Users');

/**
 * 
 * @param {Username for user being crated} username 
 * @param {Password for user being created} pass 
 * @param {Email for user being created} email 
 * @param {Gender for user being created} gender 
 * @returns {New user id if added successfully or false if not}
 * @description Basic function for adding a new user to the DB
 * 
 */
async function add(username, pass, email, gender) {
    const new_user = new Users({
        username: username,
        password: pass,
        email: email,
        gender: gender
    });
    
    let res = false;
    try {
        await new_user.save();
        console.log('Successfuly saved doc: \n' + new_user);
        res = new_user._id;
    } catch (error) {
        console.log('In function user_services/add_user: \n' + error);
    }

    return res;
}


/**
 * 
 * @param {Username of user account} auth 
 * @returns {Requested user if found, null otherwise}
 * @description Used to extract a user from the DB using his username
 */
async function get_by_username(auth) {
    let user = null;
    
    try {
        user = await Users
                        .findOne({ username: auth });        
    } catch (error) {
        console.log(`In user_services/get_by_username: \n${error}`);
    }
    
    return user;
}

/**
 * 
 * @param {Id of requested user} id
 * @returns {User with requested id if found, null otherwise}
 * @description Basic function for aquiring a user based on his id
 * 
 */
async function get_by_id(id) {
    let user = null;

    try {
        user = await Users
                        .findById(id);
    } catch (error) {
        console.log(error);
    }

    return user;
}

module.exports = {
    add,
    get_by_username,
    get_by_id
};