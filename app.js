const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");
const mongoose = require('mongoose');
const PORT = 4000;

const app = express();

//connecting to local mongodb 
mongoose.connect("mongodb://127.0.0.1:27017/demoapp",{
  useNewUrlParser:true,
  useUnifiedTopology:true
});
mongoose.connection.once('open',()=>console.log('db Connected...'))

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql:true
  })
);

app.listen(PORT, () => console.log(`server running in ${PORT}`));
