const path = require('path');
const express = require('express');
const graphQLHTTP = require('express-graphql');
const cors = require('cors');
const MyGraphQLSchema = require('./schema');

const app = express();

// Alloe Cross-Origin
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.use('/graphql', graphQLHTTP({
    schema: MyGraphQLSchema,
    graphiql: true
}));

app.use(express.static('public'));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'), (err) => {
        if(err) {
            res.status(500).send(err);
        }
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));
