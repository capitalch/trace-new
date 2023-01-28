import { gql } from '@apollo/client'
import { _ } from '@src/features'

const appGraphqlStrings: any = {
   
    genericUpdate: (val: any, dbName: string) => {
        const value = encodeObj(val)
        return gql`
        mutation ${dbName} {
            genericUpdate(value:"${value}")
        }`
    },

    genericQuery: (val:any, dbName: string) => {
        const value = encodeObj(val)
        return gql`
        query ${dbName}{
            genericQuery(value:"${value}")
        }`
    }
}


function encodeObj(obj: any) {
    let ret = ''
    if (!_.isEmpty(obj)) {
        ret = encodeURI(JSON.stringify(obj))
    }
    return ret
}

export { appGraphqlStrings, encodeObj }