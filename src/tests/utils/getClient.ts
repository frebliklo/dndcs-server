import ApolloBoost from 'apollo-boost'

const getClient = (token?: string) => {
  return new ApolloBoost({
    uri: `http://localhost:${process.env.PORT}/graphql/`,
    request(operation): any {
      if (token) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }
    },
  })
}

export default getClient
