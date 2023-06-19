/// <reference types="@emotion/react/types/css-prop" />
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client'

import { gql } from './generated'
import link from './apollo/link'

export const HANDLE_FRAGMENT = gql(`
  fragment HandleFragment on Handle {
    handler
    origin
    id
    uri
    url
  }
`)

export const PACKAGE_FRAGMENT = gql(`
  fragment PackageFragment on Package {
    ...HandleFragment
    name
  }
`)

export const GET_PACKAGES = gql(`
  query LocalResolverPackages($search: String, $app: Boolean) {
    Page {
      package(search: $search, app: $app) {
        ...PackageFragment
      }
    }
  }
`)


const Mount = () => {
  const { error, data: { Page: packagePage } = {} } = useQuery(GET_PACKAGES, { variables: { search: 'keywords:fkn', app: true } })
  const { error: error2, data: { Page: packagePage2 } = {} } = useQuery(GET_PACKAGES, { variables: { search: 'keywords:fkn', app: false } })

  if (error) console.error(error)
  if (error2) console.error(error2)

  console.log('packagePage', packagePage)
  console.log('packagePage2', packagePage2)

  return (
    <div>
      {
        packagePage
          ?.package
          ?.map(pkg =>
            <div key={pkg.uri}>
              <span>{pkg.name}</span>
            </div>
          )
      }
    </div>
  )
}

const mount = document.createElement('div')
mount.className = 'mount'

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM
  .createRoot(document.body.appendChild(mount))
  .render(
    <ApolloProvider client={client}>
      <Mount/>
    </ApolloProvider>
  )
