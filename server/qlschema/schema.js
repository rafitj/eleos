const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType ,
        GraphQLID,
        GraphQLInt,
        GraphQLSchema,
        GraphQLList,
        GraphQLNonNull,
        GraphQLString } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { 
            type: AuthorType,
            resolve(parent,args){
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve (parent,args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
});
var books = [
    {name: 'Book 2', id: '2', genre: 'Fantasy', authorId: '2'},
    {name: 'Book 1', id: '1', genre: 'Fantasy', authorId: '1'},
    {name: 'Book 3', id: '3', genre: 'Fantasy',  authorId: '3'},
    {name: 'Book 4', id: '4', genre: 'Fantasy',  authorId: '3'}
]
var authors = [
    {name: 'ASDF', id: '2', age: 122},
    {name: 'Rick', id: '1', age: 2},
    {name: 'Joh', id: '3', age: 12}
]
const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                //code to get data from db
                return _.find(books, {id:args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                //code to get data from db
                return _.find(authors, {id:args.id})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        },
    }
})

const Mutation = new GraphQLObjectType ({
    name : 'Mutation',
    fields:{
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {GraphQLInt}
            },
            resolve (parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query: RootQuery,
    mutation: Mutation
})