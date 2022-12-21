import { Box } from '@src/features'
import { AppContent } from './app-content'
import { AppHeader } from './app-header'
import { AppSidebar } from './app-sidebar'
function AppLayouts() {
    return (<Box>
        <AppHeader />
        <Box>
            <AppSidebar />
            <AppContent />
        </Box>

    </Box>)
}
export { AppLayouts }