const graphql = require('graphql');
const _ = require('lodash');
const Charity = require('../models/charity');
const tile = require('../models/tile');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLString
} = graphql;

const CharityType = new GraphQLObjectType({
    name: 'Charity',
    fields: () => ({
        id: { type: GraphQLID },
        image: { type: GraphQLString },
        description: { type: GraphQLString },
        title: { type: GraphQLString },
        creator: { type: GraphQLString },
        link: { type: GraphQLString },
        type: { type: GraphQLString },
        date: { type: GraphQLString },
        // ppl: { type: GraphQLInt }
    })
});
const TileType = new GraphQLObjectType({
    name: 'Tile',
    fields: () => ({
        id: { type: GraphQLID },
        type: { type: GraphQLString },
        trending: { type: GraphQLBoolean },
        hearts: { type: GraphQLInt },
        charityId: {
            type: CharityType,
            resolve(parent, args) {
                return Charity.findById(parent.id)
            }
        }
    })
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        charity: {
            type: CharityType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Charity.findById(args.id)
            }
        },
        charities: {
            type: new GraphQLList(CharityType),
            resolve(parent, args) {
                return Charity.find({})
            }
        },
        tile: {
            type: TileType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return (tiles, { id: args.id })
            }
        },
        tiles: {
            type: new GraphQLList(TileType),
            resolve(parent, args) {
                //code to get data from db
                return tiles
            }
        },
    }
})

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addAuthor: {
//             type: AuthorType,
//             args: {
//                 name: { type: new GraphQLNonNull(GraphQLString) },
//                 age: { GraphQLInt }
//             },
//             resolve(parent, args) {
//                 let author = new Author({
//                     name: args.name,
//                     age: args.age
//                 })
//                 return author.save()
//             }
//         }
//     }
// })

module.exports = new GraphQLSchema({
    query: RootQuery
        // mutation: Mutation
})