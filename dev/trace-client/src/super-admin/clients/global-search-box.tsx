import { appStaticStore, appStore, CloseIcon, debounceEmit, debounceFilterOn, ebukiMessages, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, SearchIcon, useEffect, } from '@src/features'

function GlobalSearchBox({ appStoreChildObject }: any) {

    useEffect(() => {
        appStaticStore.superAdmin.doFilter = doFilter
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
                value={appStoreChildObject.searchString.value}
            />
            {/* <CloseIcon color='gray.400' /> */}
            <InputRightElement  children={<IconButton onClick={handleClearSearch} size='xs' aria-label='close' icon={<CloseIcon color='gray.600' />} />} />
        </InputGroup>
    )

    function doFilter() {
        const s = appStore.superAdmin.searchString.value
        const arr = s.toLowerCase().split(/\W/).filter((x: any) => x) // filter used to remove emty elements
        const filteredRows = appStoreChildObject.rows.value.filter((row: any) => arr.every((x: string) => Object.values(row).toString().toLowerCase().includes(x.toLowerCase())))
        appStoreChildObject.filteredRows.value = filteredRows
    }

    function handleClearSearch(){
        appStoreChildObject.searchString.value =''
        appStoreChildObject.filteredRows.value = appStoreChildObject.rows.value
    }

    function handleOnChange(e: any) {
        appStoreChildObject.searchString.value = e.target.value
        debounceEmit(ebukiMessages.searchStringChangeDebounce.toString(), e.target.value)
        // doFilter(e.target.value)
    }
}
export { GlobalSearchBox }