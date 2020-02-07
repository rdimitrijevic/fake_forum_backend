const express = require('express')
const path = require('path')

const PORT = 8000

app = express();

app.listen(PORT, () => { console.log("Started at port ${PORT}") });
