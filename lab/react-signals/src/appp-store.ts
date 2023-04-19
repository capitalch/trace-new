import { deepSignal } from '@deepsignal/react'

const AppStore = deepSignal({
    admin: {
        businessUnit: {
            name: '',
            code: ''
        },
        userType: ''
    }
})

export { AppStore }

type UserType = 'SUPER_ADMIN' | 'ADMIN' | 'BUSINESS_USER'
enum UserTypeEnum {
    superAdmin = 'SUPER_ADMIN'
    , admin = 'ADMIN'
    , businessUser = 'BUSINESS_USER'
}
export { type UserType, UserTypeEnum }


// type AppStoreType = {
//     admin: {
//         businessUnit: {
//             name: string | undefined
//             code: string
//         },
//         userType: ''
//     }
// }