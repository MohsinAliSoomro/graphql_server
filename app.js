const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");
const PORT = 4000;

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql:true
  })
);

app.listen(PORT, () => console.log(`server running in 4000 ${PORT}`));
