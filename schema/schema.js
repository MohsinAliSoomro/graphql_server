const graphql = require("graphql");
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data 
const books = [
  { name: "Mohsin", genre: "Ali", id: "1" },
  { name: "Farhan", genre: "Shah", id: "2" },
  { name: "Asim", genre: "Ahmed", id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //write code for get data from db or other source
        return _.find(books,{id:args.id})
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
