import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
  Operation,
  NextLink
} from '@apollo/client'
// import { setContext } from '@apollo/client/link/context'
import {
  appStaticStore,
  axios,
  doLogout,
  getHostUrl,
  GraphQlQueryResultType,
  Messages,
  urlJoin,
  useFeedback
} from '@src/features'
import { appGraphqlStrings } from './app-graphql-strings'

// import { onError } from '@apollo/client/link/error'

function useAppGraphql() {
  const { showError, showSuccess } = useFeedback()

  function getClient() {
    // const token = appStaticStore.login.accessToken
    const token = localStorage.getItem('accessToken')
    const url: any = getHostUrl()
    const link = new HttpLink({
      uri: urlJoin(url, 'graphql/')
    })

    const authLink = new ApolloLink(
      (operation: Operation, forward: NextLink) => {
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          }
        })
        return forward(operation)
      }
    )

    // const errorLink = onError(({ graphQLErrors, networkError }) => {
    //   if (graphQLErrors) {
    //     graphQLErrors.forEach(({ message }) => {
    //       if (message === "Invalid token") {
    //         // Handle invalid token error here
    //       } else if (message === "Expired token") {
    //         // Handle expired token error here
    //       }
    //     })
    //   }
    //   if (networkError) {
    //     console.log(`[Network error]: ${networkError}`)
    //   }
    // })

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      // link: ApolloLink.from([errorLink, authLink, link]),
      link: authLink.concat(link),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only'
        }
      },
    })
    return client
  }

  async function mutateGraphql(q: any) {
    const client = getClient()
    let ret: any
    try {
      ret = await client.mutate({
        mutation: q
      })
    } catch (error: any) {
      error.message = error.message || Messages.errUpdatingData
      throw error
    }
    return ret
  }

  async function queryGraphql(q: any) {
    const client = getClient()
    let ret: any
    try {
      ret = await client.query({
        query: q,
      })
    } catch (error: any) {
      if (error.networkError) {
        handleNetworkError(q, GraphqlType.query)
      } else {
        error.message = error.message || Messages.errFetchingData
        throw error
      }

    }
    return ret
  }

  async function handleNetworkError(q: any, gqlType: GraphqlType) {
    // get refreshtoken and call refresh API to get accesstoken then again try query
    const refreshToken = localStorage.getItem('refreshToken')
    const hostUrl = getHostUrl()
    const renewTokenUrl = urlJoin(hostUrl, 'renew')
    try {
      if (!refreshToken) {
        doLogout()
      } else {
        const result: any = await axios({
          method: 'post',
          url: renewTokenUrl,
          data: {
            token: refreshToken
          }
        })
        // appStaticStore.login.accessToken = result?.data?.accessToken
        localStorage.setItem('accessToken', result?.data?.accessToken)
        if (gqlType === GraphqlType.query) {
          queryGraphql(q)
        }
      }
    } catch (e: any) {
      console.log(e)
      doLogout()
    }
  }

  function handleUpdateResult(
    result: GraphQlQueryResultType,
    actionWhenSuccess?: () => void,
    queryName: string = 'genericUpdate'
  ): boolean {
    const res: any = result?.data?.[queryName] //result.data[queryName]
    let ret = false
    const handleSuccess = () => {
      showSuccess()
      if (actionWhenSuccess) {
        actionWhenSuccess()
      }
    }
    if (res) {
      if (res?.error) {
        const detail = res.error.detail
        const errorCode = res.error.errorCode
        const exception = res.error.exception
        const message = `${errorCode}, ${detail}`
        ret = true
        showError(message)
        console.log(exception)
      } else {
        handleSuccess()
      }
    } else {
      // successful delete returns null
      handleSuccess()
    }
    return ret
  }

  function handleAndGetQueryResult(
    result: GraphQlQueryResultType,
    queryName: string = 'genericQuery'
  ): any {
    const res: any = result?.data?.[queryName]
    let out = undefined
    if (res) {
      if (res?.error) {
        const detail = res.error.detail
        const errorCode = res.error.errorCode
        const exception = res.error.exception
        const message = `${errorCode}, ${detail}`
        showError(message)
        console.log(exception)
      } else {
        out = res
      }
    }
    return out
  }

  return {
    appGraphqlStrings,
    handleAndGetQueryResult,
    handleUpdateResult,
    mutateGraphql,
    queryGraphql
  }
}

export { useAppGraphql }

enum GraphqlType { 'query', 'mutation' }
// type GraphqlType = 'query' | 'mutation'
