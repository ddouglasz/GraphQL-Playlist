const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors')
require('dotenv').config()


const app = express();

//allow cross-origin requests
app.use(cors());
// const connectionStr = process.env.MONGODB_URL;
const connectionStr = 'mongodb://steve:steve123@ds235022.mlab.com:35022/gql-spy';
console.log('*****', connectionStr)
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
