
async function password_val(pass) {
    if (typeof pass !== 'string') {
        return { 
            error: "Invalid password data type"
        };
    }

    if (pass.length < 8)
        return { 
            error: "Password too short"
        };

    return {
        ok: true
    };
}

async function username_val(usrname) {
    let re = /^\d+$/gm;

    if (typeof usrname !== 'string') {
        return { 
            error: "Invalid username data type" 
        };
    }

    if (re.test(usrname.trim().replace(" ", ""))) {
        return { 
            error: "Invalid username format"
        };
    }

    if (usrname.length < 6){
        return {
            error: "Username too short"
        };
    }

    return {
        ok: true
    };
}


async function email_val(email) {
    let re = /\S+@\S+\.\S+/;

    if (typeof email !== 'string') {
        return { 
            error: "Invalid email data type" 
        };
    }

    if (!re.test(email)){
        return { 
            error: "Invalid email format" 
        };
    }
    
    if (email.length < 6){
        return { 
            error: "Email too short" 
        };
    }

    return {
        ok: true
    };
}

async function gender_val(gender) {
    if (typeof gender !== 'string') {
        return { 
            error: "Invalid gender data type" 
        };
    }

    if (gender.toLowerCase() !== 'male'
        && gender.toLowerCase() !== 'female') {
            return { 
                error: "Invalid gender format" 
            };
    }

    return { 
        ok: true 
    };
}


module.exports = {
    username_val,
    email_val,
    gender_val,
    password_val
};