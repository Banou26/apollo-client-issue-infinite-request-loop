import { ApolloServer } from '@apollo/server'

import { typeDefs } from './schema'

export const packagePage = async (parent, args, context, info) => {
  console.log('Package Page Resolver', parent, args, context, info)
  return ([
    {
        "handler": "fkn",
        "origin": "localhost",
        "id": "4560-@banou/stub",
        "uri": "fkn:localhost:4560-@banou/stub",
        "url": "http://localhost:4560",
        "name": "@banou/stub"
    },
    {
        "handler": "fkn",
        "origin": "localhost",
        "id": "4561-@banou/all-the-sources",
        "uri": "fkn:localhost:4561-@banou/all-the-sources",
        "url": "http://localhost:4561",
        "name": "@banou/all-the-sources"
    }
  ])
}

export const resolvers = {
  Page: {
    package: packagePage
  },
  Query: {
    Page: () => ({})
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers
})
server.start()

export default server
