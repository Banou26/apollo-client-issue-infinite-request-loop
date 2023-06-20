https://github.com/apollographql/apollo-client/issues/new?assignees=&labels=&projects=&template=bug.yml


`useQuery` edge case causes infinite request loop



There is an edge case where ApolloClient enters an infinite request loop whenever there is 2 `useQuery` with the same query but different variables, e.g
```ts
  const { data } = useQuery(GET_PACKAGES, { variables: { search: 'foo', app: true } })
  const { data: data2 } = useQuery(GET_PACKAGES, { variables: { search: 'foo', app: false } })
```


https://github.com/Banou26/apollo-client-issue-infinite-request-loop


`npm i`, `npm run dev`, go to the link and see console


If `possibleTypes` is correctly set, it seems to work fine, but for my fully fledged project, this still doesn't fix the infinite loop for some reason
