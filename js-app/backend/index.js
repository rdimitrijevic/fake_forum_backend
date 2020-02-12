const express = require('express');
const mongoose = require('mongoose');
const PORT = 8001;
const User = require('./models/Users');

app = express();

let DB_CONNECTION = "mongodb+srv://lale:lalelale@cluster0-lazue.gcp.mongodb.net/test?retryWrites=true&w=majority";

let p = mongoose.connect(DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
/*     .then(() => { console.log("Connected to db") })
    .catch((err) => { console.log(err) }); */



usr = new User({
    username: "lale98",
    password: "password",
    email: "radoslav@raf.rs",
    gender: "male"
});

p.then(async () => {
    await usr.save()
    .then(() => { console.log('added') })
    .catch((err) => { console.log(err.message) });
})
.catch((err) => console.log(err));

app.listen(PORT);
