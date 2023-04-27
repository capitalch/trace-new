import { usingAuthUtils } from './utils'
import { usingStoreUtils } from './stores/store-utils'

export { AppGridSearchBox, AppAlertDialogOk, AppGridToolbar, AppLoader, AppRequiredAstrisk } from './components'
export { AppConstants } from './app-constants'
export { appStore, type AppStoreType } from './stores/app-store'
export { appStaticStore } from './stores/app-static-store'
export {
  ComponentNamesEnum,
  type GraphQlQueryResultType,
  SideMenuTypesEnum,
  type SideMenuType,
  type LoginInfoType,
  type SqlObjectType,
  UserTypesEnum,
  type UserTypesType
} from './app-types'
export { appValidators } from './app-validators'
export {
  emit,
  ebukiMessages,
  filterOn,
  hotEmit,
  hotFilterOn,
  debounceEmit,
  debounceFilterOn
} from './ibuki'

export { Messages } from './messages'
export { useAppGraphql } from './graphql/app-graphql-hook'
export {
  getHostUrl,
  useAgGridUtils,
  usingAuthUtils,
  useCellRenderers,
  useComponentHistory,
  useDialogs,
  useFeedback
} from './utils'

const {
  getAccessTokenFromLS,
  setAccesstokenInLS,
  getRefreshTokenFromLS,
  setRefreshTokenInLS,
  getIsLoggedInFromLS,
  setIsLoggedInInLS,
  getLoginInfoFromLS,
  resetLoginInfoInLS,
  setLoginInfoInLS
} = usingAuthUtils()
export {
  getAccessTokenFromLS,
  setAccesstokenInLS,
  getRefreshTokenFromLS,
  setRefreshTokenInLS,
  getIsLoggedInFromLS,
  setIsLoggedInInLS,
  getLoginInfoFromLS,
  resetLoginInfoInLS,
  setLoginInfoInLS
}
const { doLogout } = usingStoreUtils()
export { doLogout }

