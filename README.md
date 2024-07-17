# learning-GraphQL
Learning GraphQL - LinkedinLearning Course

by Eve Porcello &rarr; www.linkedin.com/learning/learning-graphql-11292553

```
npm init -y
npm install graphql apollo-server nodemon
npm start
```

# First example

```
query {
  totalDays
}
```

# Second example

```
query {
  totalDays
  allDays {
    id
    date
    mountain
    conditions
  }
}
```

# Mutation remove

```
mutation {
  removeDay(id: 3) {
    date
    id
    mountain
  }
}
```

# Mutation add

```
mutation {
  addDay(input: {
    date: "1/2/2025"
    mountain: "Apline Meadows"
    conditions: ICE
  }) {
    date
    id
  }
}
```