const bcrypt = require('bcryptjs');

async function pass_hash(next, self)
{
    const salt = await bcrypt.genSaltSync(10);
    console.log(self.password);
    bcrypt.hash(self.password, salt, (err, hash) => {
        if(err)
            return next(err);
        
        self.password = hash;
        console.log(hash);
        next();
    });
}

module.exports = {
    pass_hash
}