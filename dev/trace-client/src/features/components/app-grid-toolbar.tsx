import { AppConstants, } from "@src/features"
import {  Box, Button, DownloadIcon, Heading, HStack, IconButton, RefreshIcon, Select, Tooltip, useMediaQuery, } from '@src/libs'
import {AppGridSearchBox,} from './app-grid-search-box'

function AppGridToolbar({ appStoreObject, title, CustomControl, toShowLastNoOfRows, gridApiRef }: { appStoreObject: any,  title?: string, CustomControl?: any, toShowLastNoOfRows?: any, gridApiRef?: any }) {
    const [isLargerThan480] = useMediaQuery("(min-width: 480px)", { ssr: false })
    const [isLargerThan992] = useMediaQuery("(min-width: 992px)", { ssr: false })
    let toShow = toShowLastNoOfRows

    if ([undefined, null].includes(toShowLastNoOfRows)) {
        toShow = true
    }

    return (
        <HStack mb={2}
            rowGap={1}
            wrap='wrap'
            h={AppConstants.COMPONENT_TOOLBAR_HEIGHT}
            justifyContent="space-between">
            {isLargerThan992 && <Box>
                {title && <Heading size='sm'>{title}</Heading>}
            </Box>}
            <HStack wrap='wrap'>
                {CustomControl && <CustomControl />}
                {isLargerThan480 && gridApiRef && <Tooltip label='Export as CSV file'>
                    <Button colorScheme='twitter' rightIcon={<DownloadIcon />} variant='outline' size='sm' onClick={handleExportCsv}>Export csv</Button>
                </Tooltip>}
                {toShow && <Select size='sm' w='0.5xs' variant='filled' defaultValue={appStoreObject.noOfRows.value} onChange={handleOnSelectRows}>
                    <option value='100'>Last 100 rows</option>
                    <option value='1000'>Last 1000 rows</option>
                    <option value=''>All rows</option>
                </Select>}
                {isLargerThan480 && <Tooltip label='Reload data'>
                    <IconButton size='sm' aria-label="Reload"
                        onClick={handleOnClickReload}
                        icon={<RefreshIcon fontSize={26} color='blue.500' />} />
                </Tooltip>}
                <AppGridSearchBox appStoreObject={appStoreObject} />
            </HStack>
        </HStack>
    )

    function handleExportCsv() {
        if (gridApiRef) {
            gridApiRef.current.api.exportDataAsCsv()
        }
    }

    async function handleOnClickReload() {
        appStoreObject.doReload()
    }

    function handleOnSelectRows(e: any) {
        appStoreObject.noOfRows.value = e.target.value
        appStoreObject.doReload()
    }
}
export { AppGridToolbar }