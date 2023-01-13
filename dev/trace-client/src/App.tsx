import {
  ChakraProvider,
  theme,
} from "@src/features"

import { AppLayouts } from "@src/layouts"
import { LicenseInfo } from '@mui/x-data-grid-pro'

LicenseInfo.setLicenseKey(
  '094c13fcff99f49fe015161354d1d052T1JERVI6MjkzMjgsRVhQSVJZPTE2NjMxMjQ0NjcwMDAsS0VZVkVSU0lPTj0x'
)

export const App = () => (
  <ChakraProvider theme={theme}>
    <AppLayouts />
  </ChakraProvider>
)
