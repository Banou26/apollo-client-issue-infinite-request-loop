import { CodegenConfig } from '@graphql-codegen/cli'
import { writeFile } from 'fs/promises'
import { ApolloServer, HeaderMap } from '@apollo/server'

import { typeDefs } from './src/apollo/schema'

const server = new ApolloServer({
  typeDefs
})
server.start()

server.executeHTTPGraphQLRequest({
  httpGraphQLRequest: {
    body: {
      operationName: 'IntrospectionQuery',
      variables: {},
      query: `
        query IntrospectionQuery {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `
    },
    headers: new HeaderMap([['Content-Type', 'application/json']]),
    method: 'POST',
    search: ''
  },
  context: async () => ({})
})
  // @ts-expect-error
  .then(result => new Response(result.body.string, { headers: result.headers }).json())
  .then((result: any) => {
    const possibleTypes = {}

    result.data.__schema.types.forEach(supertype => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] =
          supertype.possibleTypes.map(subtype => subtype.name)
      }
    })

    writeFile('./src/generated/possibleTypes.js', `export default ${JSON.stringify(possibleTypes)}`, err => {
      if (err) {
        console.error('Error writing possibleTypes.js', err)
      } else {
        console.log('Fragment types successfully extracted!')
      }
    })
  })

const config: CodegenConfig = {
  schema: ['./src/apollo/local-only.graphql', typeDefs],
  documents: ['src/**/*.ts', 'src/**/*.tsx'],
  generates: {
    './src/generated/': {
      preset: 'client',
      plugins: [
        {
          add: {
            content: `import type { Uri } from '../utils/uri'`
          }
        },
        'typescript-resolvers'
      ],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false
      },
      config: {
        withComponent: true,
        scalars: {
          Uri: 'Uri'
        }
      }
    }
  },
  ignoreNoDocuments: true
}

export default config
