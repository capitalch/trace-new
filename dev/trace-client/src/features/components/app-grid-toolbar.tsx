import { AppConstants, AppGridSearchBox, appStaticStore, appStore, Box, Heading, HStack, IconButton, RefreshIcon, Select, Tooltip, useMediaQuery, } from "@src/features"

function AppGridToolbar({ appStoreObject, appStaticStoreObject, title, CustomControl }: { appStoreObject: any, appStaticStoreObject: any, title?: string, CustomControl?: any }) {
    const [isLargerThan480] = useMediaQuery("(min-width: 480px)", { ssr: false })
    const [isLargerThan992] = useMediaQuery("(min-width: 992px)", { ssr: false })
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
                <Select size='sm' w='0.5xs' variant='filled' defaultValue={appStoreObject.noOfRows.value} onChange={handleOnSelectRows}>
                    <option value='100'>Last 100 rows</option>
                    <option value='1000'>Last 1000 rows</option>
                    <option value=''>All rows</option>
                </Select>
                {isLargerThan480 && <Tooltip label='Reload data'>
                    <IconButton size='sm' aria-label="Reload"
                        onClick={handleOnClickReload}
                        icon={<RefreshIcon fontSize={26} color='blue.500' />} />
                </Tooltip>}
                <AppGridSearchBox appStoreObject={appStoreObject} appStaticStoreObject={appStaticStoreObject} />
            </HStack>
        </HStack>
    )

    async function handleOnClickReload() {
        appStaticStoreObject.doReload()
    }

    function handleOnSelectRows(e: any) {
        appStoreObject.noOfRows.value = e.target.value
        appStaticStoreObject.doReload()
    }
}
export { AppGridToolbar }