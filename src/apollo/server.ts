import { ApolloServer } from '@apollo/server'

import { typeDefs } from './schema'

export const packagePage = async (parent, args, context, info) => {
  console.log('Package Page Resolver', parent, args, context, info)
  await new Promise(resolve => setTimeout(resolve, 1000))
  return ([
    {
        "uri": "foo",
        "name": "foo"
    },
    {
        "uri": "bar",
        "name": "bar"
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
