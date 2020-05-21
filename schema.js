const axios = require('axios');
const env = require('dotenv').config({path: __dirname + '/.env'});

// GraphQL Types 
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLFloat
} = require('graphql');

// Profile Type 
const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        // Fields for Profile Response Object
        username: { type: GraphQLString },
        num_collection: { type: GraphQLInt },
        num_wantlist: { type: GraphQLInt },
        avatar_url: { type: GraphQLString }
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
        wants: { type: new GraphQLList(WantsType) },
        pagination: { type: PaginationWantlistType }

    })
})

// Wants Type
const WantsType = new GraphQLObjectType({
    name: 'WantsType',
    fields: () => ({
        rating: { type: GraphQLInt },
        notes: { type: GraphQLString },
        date_added: { type: GraphQLString },
        basic_information: { type: BasicInformationWantlistType },
    })
});

// Pagination Type
const PaginationWantlistType = new GraphQLObjectType({
    name: 'PaginationWantlist',
    fields: () => ({
        per_page: { type: GraphQLInt  },
        items: { type: GraphQLInt },
        page: { type: GraphQLInt },
        urls: { type: UrlWantlistType },
        pages: { type: GraphQLInt }        
    })
});

// UrlWantlistType
const UrlWantlistType = new GraphQLObjectType({
    name: 'UrlWantlistType',
    fields: () => ({
        last: { type: GraphQLString },
        next: { type: GraphQLString }
    })
})

// BasicInformation Type
const BasicInformationWantlistType = new GraphQLObjectType({
    name: 'BasicInformationWantlistType',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        year: { type: GraphQLInt },
        thumb: { type: GraphQLString },
        cover_image: { type: GraphQLString },
        master_id: { type: GraphQLInt },
        formats:  { type: new GraphQLList(FormatsType) },
        labels: { type: new GraphQLList(LabelsType) },
        artists: { type: new GraphQLList(WantlistArtistType) },
        resource_url: { type: GraphQLString },
        releases: { type: WantlistReleasesType }
    })
});

// WantlistArtistType
const WantlistArtistType = new GraphQLObjectType({
    name: 'WantlistArtistType',
    fields: () => ({
        name: { type: GraphQLString },
        anv: { type: GraphQLString }
    })
})

// Labels Type 
const LabelsType = new GraphQLObjectType({
    name: 'Labels',
    fields: () => ({
        name: { type: GraphQLString },
        catno: { type: GraphQLString }
    })
});

// Formats Type
const FormatsType = new GraphQLObjectType({
    name: 'Formats',
    fields: () => ({
        /**
         *  formats [ descriptions [ "", "" ] ]
         */
        descriptions: { type: new GraphQLList(GraphQLString) }
    })
});

// WantlistReleasesType
const WantlistReleasesType = new GraphQLObjectType({
    name: 'WantlistReleases',
    fields: () => ({
        num_for_sale: { type: GraphQLInt },
        lowest_price: { type: GraphQLFloat }
    })
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
        },
        collection: {
            type: CollectionType,
            args: {
                page: { type: GraphQLInt },
                per_page: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.discogs.com/users/eckosneekz/collection/folders/0/releases?sort=added&sort_order=desc&per_page=${ args.per_page }&token=${ process.env.DISCOGS_API_TOKEN }&page=${ args.page }`)
                    .then(res => res.data)
            }
        },
        wantlist: {
            type: WantlistType,
            args: {
                page: { type: GraphQLInt },
                per_page: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios.get(`https://api.discogs.com/users/eckosneekz/wants?sort=added&sort_order=desc&per_page=${ args.per_page }&token=${ process.env.DISCOGS_API_TOKEN }&page=${ args.page }`)
                    .then(res => res.data)
                    // Need to make a subsequest API request to https://api.discogs.com/releases/${ args.id } 
            }
        },
        releases: {
           type: WantlistReleasesType,
           args: {
               id: { type: GraphQLInt },
                
           },
           resolve(parent, args) {
                return axios.get(`https://api.discogs.com/releases/${ args.id }`)
                    .then(res => res.data)
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});