const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors')
// const dotenv = require('dotenv');
require('dotenv').config({ path: `${process.cwd()}/../.env` })

// dotenv.config();
const app = express();
console.log('******', process.cwd() + '../.env')
//allow cross-origin requests
app.use(cors());
const connectionStr = process.env.REACT_APP_MONGODB_URL;
mongoose.connect(connectionStr, {useNewUrlParser: true})
mongoose.connection.once('open', () => {
    console.log('we are connected to mongoose')
})

const port = 4001

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen (port, () => {
    console.log(`Server listening on port ${port}`);
});
