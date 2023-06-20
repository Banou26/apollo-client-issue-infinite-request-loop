export const typeDefs = `#graphql
interface Handle {
  uri: String!
}

type Package implements Handle {
  uri: String!
  name: String!
}

type Page {
  package(search: String, app: Boolean): [Package!]!
}

type Query {
  Page: Page!
}
schema {
  query: Query
}

`