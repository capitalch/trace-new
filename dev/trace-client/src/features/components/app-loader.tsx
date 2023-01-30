import { appStore, Center, Flex, Spinner } from '@src/features'
function AppLoader() {
    const toShow = appStore.appLoader.toShow.value
    return (
        <Center style={{ position: 'absolute', bottom: '40%', left: '50%' }} height="200px" p={2} hidden={!toShow}>
            <Flex flexDirection="column" alignItems="center">
                <Spinner size="xl" color="teal"  />
            </Flex>
        </Center>
    )
}

export { AppLoader }