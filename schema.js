const axios = require('axios');
const env = require('dotenv').config({path: __dirname + '/.env'});

// GraphQL Types 
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
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

// Collection Type
const CollectionType = new GraphQLObjectType({
    name: 'Collection',
    fields: () => ({
        pagination: { type: PaginationType },
        releases: { type: new GraphQLList(ReleasesType) }
    })
});

// Pagination Type 
const PaginationType = new GraphQLObjectType({
    name: 'Pagination',
    fields: () => ({
        per_page: { type: GraphQLInt },
        items: { type: GraphQLInt },
        page: { type: GraphQLInt },
        urls: { type: UrlType },
        pages: { type: GraphQLInt }
    }),
});

// Url Type
const UrlType = new GraphQLObjectType({
    name: 'Urls',
    fields: () => ({
        last: { type: GraphQLString },
        next: { type: GraphQLString }
    })
});

// Releases Type 
const ReleasesType = new GraphQLObjectType({
    name: 'Releases',
    fields: () => ({
        date_added: { type: GraphQLString },
        basic_information: { type: BasicInformationType }
    })
});

// BasicInformation Type
const BasicInformationType = new GraphQLObjectType({
    name: 'BasicInformation',
    fields: () => ({
        id: { type: GraphQLInt },
        year: { type: GraphQLInt },
        title: { type: GraphQLString },
        artists: { type: new GraphQLList(ArtistsType) },
        cover_image: { type: GraphQLString }
    })
})

// Artists Type
const ArtistsType = new GraphQLObjectType({
    name: 'Artists',
    fields: () => ({
        name: { type: GraphQLString }
    })
})

// Wantlist Type
const WantlistType = new GraphQLObjectType({
    name: 'Wantlist',
    fields: () => ({
        wants: { type: new GraphQLList(WantsType) }
    })
})

// Wants Type
const WantsType = new GraphQLObjectType({
    name: 'WantsType',
    fields: () => ({
        rating: { type: GraphQLInt },
        basic_information: { type: BasicInformationWantlistType }
    })
});

// BasicInformation Type
const BasicInformationWantlistType = new GraphQLObjectType({
    name: 'BasicInformationWantlistType',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        year: { type: GraphQLInt },
        thumb: { type: GraphQLString },
        cover_image: { type: GraphQLString },
        master_id: { type: GraphQLInt }
    })
});

// MasterType
const MasterType = new GraphQLObjectType({
    name: 'Master',
    fields: () => ({
        num_for_sale: { type: GraphQLInt }
    })
})

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
        },
        collection: {
            type: CollectionType,
            resolve(parent, args) {
                return axios.get(`https://api.discogs.com/users/eckosneekz/collection/folders/0/releases?sort=added&sort_order=desc&per_page=50&token=${ process.env.DISCOGS_API_TOKEN }`)
                    .then(res => res.data)
            }
        },
        wantlist: {
            type: WantlistType,
            resolve(parent, args) {
                return axios.get(`https://api.discogs.com/users/eckosneekz/wants?sort=added&sort_order=desc&per_page=50&token=${ process.env.DISCOGS_API_TOKEN }`)
                    .then(res => res.data)
            }
        },
        master: {
           type: MasterType,
           args: {
               master_id: { type: GraphQLInt }
           },
            resolve(parent, args) {
                return axios.get(`https://api.discogs.com/masters/${ args.master_id }`)
                    .then(res => res.data)
            }
       }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});