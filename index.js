const { ApolloServer, gql, MockList } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type SkiDay {
    id: ID!
    date: Date!
    mountain: String!
    conditions: Conditions
  }

  enum Conditions {
    POWDER
    HEAVY
    ICE
    THIN
  }

  type Query {
    totalDays: Int!
    allDays: [SkiDay!]!
  }

  input AddDayInput {
    date: Date!
    mountain: String
    conditions: Conditions
  }

  type RemoveDayPayload {
    day: SkiDay!
    removed: Boolean
    totalBefore: Int
    totalAfter: Int
  }

  type Mutation {
    addDay(input: AddDayInput!): SkiDay
    removeDay(id: ID!): RemoveDayPayload!
  }
`;

const mocks = {
  Date: () => "1/2/2025",
  String: () => "Cool data",
  Query: () => ({
    //OLD Deprecated
    //allDays: () => new MockList(8) //8 mocks example
    //allDays: () => new MockList([1, 10]) //random number between 1 and 10
    //NEW
    allDays: () => [... new Array(8)]
  })
};

const server = new ApolloServer({
  typeDefs,
  mocks
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));
