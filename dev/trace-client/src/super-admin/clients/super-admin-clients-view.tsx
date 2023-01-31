import { useEffect, useAppGraphql } from '@src/features'
function SuperAdminClientsView() {
    const { appGraphqlStrings, queryGraphql } = useAppGraphql()

    useEffect(() => {
        loadData()
    }, [])

    return (<>
        View
    </>)

    async function loadData() {
        const val = {
            sqlId: 'get_all_clients',
            sqlArgs: {}
        }
        const q = appGraphqlStrings['genericQuery'](val, 'traceAuth')
        const ret = await queryGraphql(q)
        console.log(ret)
    }
}

export { SuperAdminClientsView }