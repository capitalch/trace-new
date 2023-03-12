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
  appStore,
  GraphQlQueryResultType,
  Messages,
  urlJoin,
  useFeedback
} from '@src/features'
import { appGraphqlStrings } from './app-graphql-strings'

function useAppGraphql () {
  const { showError, showSuccess } = useFeedback()
  function getClient () {
    const token = appStore.login.token.value
    const url: any =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_LOCAL_SERVER_URL
        : window.location.href
    const link = new HttpLink({
      uri: urlJoin(url, 'graphql/')
    })

    const authLink = new ApolloLink(
      (operation: Operation, forward: NextLink) => {
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : ''
            // 'x-access-token': token ? `Bearer ${token}` : ''
          }
        })
        return forward(operation)
      }
    )

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(link),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only'
        }
      }
    })
    return client
  }

  async function mutateGraphql (q: any) {
    const client = getClient()
    let ret: any
    try {
      ret = await client.mutate({
        mutation: q
      })
    } catch (error: any) {
      error.message = error.message || Messages.errUpdatingData
      // showError(error.message || Messages.errUpdatingData)
      throw error
    }
    return ret
  }

  async function queryGraphql (q: any) {
    const client = getClient()
    let ret: any
    try {
      ret = await client.query({
        query: q
      })
    } catch (error: any) {
      // showError(error.message || Messages.errFetchingData)
      error.message = error.message || Messages.errFetchingData
      throw error
    }
    return ret
  }

  function handleUpdateResult (
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

  function handleAndGetQueryResult (
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
