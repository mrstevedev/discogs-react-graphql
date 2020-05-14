const axios = require('axios');
const env = require('dotenv').config({path: __dirname + '/.env'});

// GraphQL Types 
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = require('graphql');

// Profile Type 
const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        // Fields for Profile Response Object
        username: { type: GraphQLString },
        num_collection: { type: GraphQLInt },
        num_wantlist: { type: GraphQLInt }
    }),
});

// Root Query 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        profile: {
            type: ProfileType,
            resolve(parent, args) {
                return axios.get(`https://api.discogs.com/users/eckosneekz?token=${ process.env.DISCOGS_API_TOKEN }`)
                    .then(res => res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});