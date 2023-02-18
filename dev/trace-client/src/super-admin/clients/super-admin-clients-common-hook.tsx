import { GraphQlQueryResultType, Messages, useAppGraphql, } from "@src/features"

function useSuperAdminClientsCommon() {
    const { appGraphqlStrings, handleAndGetQueryResult, queryGraphql } = useAppGraphql()

    async function validateClientCode(clientCode: string, setError:any) {
        const args = {
            sqlId: 'get_client',
            sqlArgs: {
                clientCode: clientCode
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        let ret = undefined
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows && (rows.length > 0)) {
                setError('clientCode', {
                    type: '400',
                    message: Messages.errClientExists
                })
                ret = Messages.errClientExists
            }
        } catch (e: any) {
            console.log(e)
        }
        return (ret)
    }

    return ({ validateClientCode })
}
export { useSuperAdminClientsCommon }