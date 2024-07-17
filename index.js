const { ApolloServer, gql, MockList } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  """
  An object that describes the characteristics of a ski day
  """
  type SkiDay {
    "A Ski day's unique identifier"
    id: ID!
    "The date that a ski day occurred"
    date: Date!
    "The location where a ski day occurred"
    mountain: String!
    "The shape that the snow was in when the ski day happened"
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

  type Subscription {
    newDay: SkiDay!
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
