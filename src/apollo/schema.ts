
const PackageParamaters = `#graphql
  """Filter by search terms"""
  search: String

  """Filter if the package is an app"""
  app: Boolean
`

export const typeDefs = `#graphql

scalar Uri

interface Handle {
  handler: String!
  origin: String!
  id: String!
  uri: Uri!
  url: String
}

type Package implements Handle {
  handler: String!
  origin: String!
  id: String!
  uri: Uri!
  url: String
  name: String!
}


extend type Query {
  package(${PackageParamaters}): Package

  Page(
    """Cursor from where to start"""
    at: String

    """How many pages before the cursor to return"""
    before: Int

    """How many pages after the cursor to return"""
    after: Int
  ): Page!
}

type Page {
  package(${PackageParamaters}): [Package!]!
}

type Query {
  dummy: String
}
type Mutation {
  dummy: String
}
type Subscription {
  dummy: String
}
schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

`