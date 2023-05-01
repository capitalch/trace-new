import { debounceEmit, debounceFilterOn, ebukiMessages, useAgGridUtils, } from '@src/features'
import { CloseIcon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, SearchIcon, useEffect,} from '@src/libs'
// appStore[storeObjectName] and appStaticStore[storeObjectName] gives the required object

function AppGridSearchBox({ appStoreObject}: { appStoreObject: any,}) {
    const { swapId } = useAgGridUtils()
    // const appStoreObject:any = appStore[storeObjectName]
    useEffect(() => {
        appStoreObject.doFilter = doFilter
        const subs1 = debounceFilterOn(ebukiMessages.searchStringChangeDebounce.toString(), 1200).subscribe((d: any) => {
            doFilter()
        })
        return (() => {
            subs1.unsubscribe()
        })
    }, [])

    return (
        <InputGroup size='sm' w={225}>
            <InputLeftElement pointerEvents='auto' children={<SearchIcon color='gray.400' />} />
            <Input variant='flushed'
                onChange={handleOnChange}
                placeholder='Global search'
                value={appStoreObject.searchString.value}
            />
            <InputRightElement children={<IconButton onClick={handleClearSearch} size='xs' aria-label='close' icon={<CloseIcon color='gray.600' />} />} />
        </InputGroup>
    )

    function doFilter() {
        const s = appStoreObject.searchString.value
        const arr = s.toLowerCase().split(/\W/).filter((x: any) => x) // filter used to remove emty elements
        const filteredRows = appStoreObject.rows.value.filter((row: any) => arr.every((x: string) => Object.values(row).toString().toLowerCase().includes(x.toLowerCase())))

        appStoreObject.filteredRows.value = swapId(filteredRows)
    }

    function handleClearSearch() {
        appStoreObject.searchString.value = ''
        appStoreObject.filteredRows.value = appStoreObject.rows.value
    }

    function handleOnChange(e: any) {
        appStoreObject.searchString.value = e.target.value
        debounceEmit(ebukiMessages.searchStringChangeDebounce.toString(), e.target.value)
    }
}
export { AppGridSearchBox }