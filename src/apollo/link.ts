import { ApolloLink } from '@apollo/client'
import { HttpLink } from '@apollo/client'
import { onError } from '@apollo/link-error'

import server from './server'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const fetch: (input: RequestInfo | URL, init: RequestInit) => Promise<Response> = async (input, init) => {
  console.log('link fetch', input, init)
  const body = JSON.parse(init.body!.toString())
  const headers = new Map<string, string>()
  for (const [key, value] of Object.entries(init.headers!)) {
    if (value !== undefined) {
      headers.set(key, Array.isArray(value) ? value.join(', ') : value)
    }
  }
  const res = await server.executeHTTPGraphQLRequest({
    httpGraphQLRequest: {
      body,
      headers,
      method: init.method!,
      search: ''
    },
    context: async () => ({ input, init })
  })
  // @ts-expect-error
  return new Response(res.body.string, { headers: res.headers })
}

export default ApolloLink.from([errorLink.concat(new HttpLink({ fetch }))])
