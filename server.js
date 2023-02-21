const dotenv = require('dotenv');

// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");

dotenv.config({path: './config.env'});

// eslint-disable-next-line import/no-dynamic-require
const app = require(`${__dirname}/app`);

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
}).then(con => {
    console.log(con.connections);
    console.log('DB connect success');
}).catch(err => {
    console.error(`Error: ${err}`);
})

const port = process.env.PORT || 8000;

// console.log(process.env)

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});