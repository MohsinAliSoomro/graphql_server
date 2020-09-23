const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

//dummy data
const books = [
  { name: "Mohsin", genre: "Ali", id: "1", autherid: "1" },
  { name: "Farhan", genre: "Shah", id: "2", autherid: "2" },
  { name: "Asim", genre: "Ahmed", id: "3", autherid: "3" },
];
const authors = [
  { name: "Mohsin", age: 21, id: "1" },
  { name: "Farhan", age: 22, id: "2" },
  { name: "Asim", age: 23, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author:{
        type:AutherType,
        resolve(parent,args){
            return _.find(authors,{id:parent.autherid})
        }
    }
  }),
});

const AutherType = new GraphQLObjectType({
  name: "Auther",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //write code for get data from db or other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AutherType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
