
function password_val(req, res, next) {
    let pass = req.body.password;

    if (typeof pass !== 'string') {
        res
        .status(400)
        .send({ error: "Invalid data type" });
        
        return;
    }

    if (pass.length >= 8)
        next();
    else
        res
        .status(400)
        .send({ error: "Password too short" });
}

function username_val(req, res, next) {
    let usrname = req.body.username;
    let re = /^\d+$/gm;

    if (typeof usrname !== 'string') {
        res
        .status(400)
        .send({ error: "Invalid data type" });

        return;
    }

    if (re.test(usrname.trim().replace(" ", ""))) {
        res
        .status(400)
        .send({ error: "Invalid username format"})

        return
    }

    if (usrname.length < 6){
        
        res
        .status(400)
        .send({ error: "Username too short" });

        return
    }



    next();
}


function email_val(req, res, next) {
    let email = req.body.email;
    let re = /\S+@\S+\.\S+/;

    if (typeof email !== 'string') {
        res
        .status(400)
        .send({ error: "Invalid data type" });

        return;
    }

    if (!re.test(email)){
        res
        .status(400)
        .send({ error: "Invalid email format" });

        return;
    }
    
    if (email.length < 6){
        res
        .status(400)
        .send({ error: "Email to short" });

        return;
    }

    next();
}

function gender_val(req, res, next) {
    let gender = req.body.gender;

    if (typeof gender !== 'string') {
        res
        .status(400)
        .send({ error: "Invalid data type" });

        return;
    }

    if (gender.toLowerCase() !== 'male'
        && gender.toLowerCase() !== 'female') {
        res
        .status(400)
        .send({ error: "Invalid gender format" });

        return;
    }

    next();
}

module.exports = {
    password_val,
    username_val,
    email_val,
    gender_val
};