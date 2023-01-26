import {
    ApolloClient,
    ApolloLink,
    InMemoryCache,
    HttpLink,
    // Operation,
    // NextLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { appStore, Messages, urlJoin } from '@src/features'

function useAppGraphql() {
    function getClient() {
        const token = appStore.login.token.value
        const url: any =
            process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_LOCAL_SERVER_URL
                : window.location.href
        const link = new HttpLink({
            uri: urlJoin(url, 'graphql/')
        })

        const authLink = new ApolloLink((operation: any, forward: any) => {
            operation.setContext({
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            })
            return (forward(operation))
        })

        // const authLink = new ApolloLink((operation, forward) => {
        //     operation.setContext(({ headers = {} }) => ({
        //         headers: {
        //             ...headers,
        //             authorization: 'Bearer ' + token
        //         },
        //     }));

        //     return forward(operation);
        // });

        // const authLink = setContext((_,{headers}:any)=>{
        //     return(
        //         {
        //             ...headers,
        //             Authorization: token ? `Bearer ${token}` : ''
        //         }
        //     )
        // })

        // const newLink = ApolloLink.from([authLink, link])
        const client = new ApolloClient({
            cache: new InMemoryCache(),
            // link: newLink
            link: authLink.concat(link),
            defaultOptions: {
                query: {
                    fetchPolicy: 'network-only'
                }
            }
        })

        return (client)
    }

    function handleError(error: any) {
        // if (error?.networkError?.statusCode === 1007) {
        //     globalStore.value.resetLoginInfo()
        // }
        // error.message =
        //     error?.networkError?.result?.message ||
        //     error.message ||
        //     messages.errFetch
        // showErrorMessage({ message: error.message })
        // console.log(error)
        throw error
    }

    async function mutateGraphql(q: any) {
        const client = getClient()
        let ret: any
        try {
            ret = await client.mutate({
                mutation: q,
            })
        } catch (error: any) {
            handleError(error)
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
            handleError(error)
        }
        return ret
    }

    return ({ mutateGraphql, queryGraphql })

}

export { useAppGraphql }