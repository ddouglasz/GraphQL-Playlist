const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;

//dummy data
var books = [
    {
        id: '1',
        name: 'Great wild',
        genre: 'Judicial',
        authorId: '1'
    },
    {
        id: '2',
        name: 'Blue sky',
        genre: 'Espionage',
        authorId: '2'
    },
    {
        id: '3',
        name: 'Wind',
        genre: 'house',
        authorId: '3'
    },
    {
        id: '4',
        name: 'Billy',
        genre: 'sci-fi',
        authorId: '1'
    },
    {
        id: '5',
        name: 'Dirty even',
        genre: 'romance',
        authorId: '2'
    },
    {
        id: '6',
        name: 'Lemon Slice',
        genre: 'Espionage',
        authorId: '2'
    }
];

var authors = [
    {
        id: '1',
        name: 'Steve Dougs',
        age: 32
    },
    {
        id: '2',
        name: 'Jake Gal',
        age: 43
    },
    {
        id: '3',
        name: 'Sam Judo',
        age: 51
    }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
             resolve(parent, args){
                //  console.log(parent);
                return _.find(authors, {id: parent.authorId});
             }
            }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                console.log(parent)
               return _.filter(books, {authorId: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //codes to get data from db / other sources
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){
                return  books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

