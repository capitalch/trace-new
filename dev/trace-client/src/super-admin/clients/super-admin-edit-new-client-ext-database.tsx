import {
    _, appStore, appValidators, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, Flex, GraphQlQueryResultType, HStack, Input,
    Messages, useDialogs, useAppGraphql,
    useForm, useQueryResult, VStack, appStaticStore, useEffect, useState, Text, AppRequiredAstrisk, useFeedback, Center, NumberInput, NumberInputField,
} from '@src/features'
// import { getGraphQlError } from '@src/features/utils'


function SuperAdminEditNewClientExtDatabase() {
    const { handleUpdateResult, handleAndGetQueryResult } = useQueryResult()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, showAlertDialogOk, } = useDialogs()
    const { appGraphqlStrings, mutateGraphql, queryGraphql } = useAppGraphql()
    const { showAppLoader, showError } = useFeedback()
    const { checkNumeric, checkNoSpace, checkNoSpaceOrSpecialChar, checkNoSpecialChar, checkUrl } = appValidators()
    const { getValues, handleSubmit, register, formState: { errors }, setValue, }: any = useForm<SuperAdminClientType>({ mode: 'onTouched' })
    const defaultData = appStore.modalDialogA.defaultData.value

    useEffect(() => {
        setFormValues()
    }, [])

    const registerClientCode = register('clientCode', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
        , validate: {
            noSpaceOrSpecialChar: checkNoSpaceOrSpecialChar,
        }
    })
    const registerClientName = register('clientName', {
        required: Messages.errRequired
        , validate: {
            noSpecialChar: checkNoSpecialChar
        }
    })
    const registerHost = register('host', {
        required: Messages.errRequired
        , validate: {
            noSpace: checkNoSpace
        }
    })
    const registerUser = register('user', {
        minLength: { value: 4, message: Messages.errAtLeast4Chars },
        required: Messages.errRequired
        , validate: {
            noSpaceOrSpecialChar: checkNoSpaceOrSpecialChar
        }
    })
    const registerPassword = register('password', {
        minLength: { value: 4, message: Messages.errAtLeast4Chars },
        required: Messages.errRequired
    })
    const registerPort = register('port', {
        required: Messages.errRequired
        , validate: {
            onlyNumeric: checkNumeric
        }
    })
    const registerUrl = register('url', {
        validate: {
            urlType: checkUrl
        }
    })
    const registerDbName = register('dbName', {
        required: Messages.errRequired
        , validate: {
            noSpaceOrSpecialChar: checkNoSpaceOrSpecialChar
        }
    })
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                {/* client code */}
                <FormControl isInvalid={!!errors.clientCode}>
                    <FormLabel fontWeight='bold' htmlFor='clientCode'>Client code <AppRequiredAstrisk /></FormLabel>
                    <Input placeholder='e.g battleGround' name='clientCode' autoFocus size='sm' type='text' autoComplete='off' {...registerClientCode} />
                    <HStack justifyContent='space-between' alignItems='center'>
                        {(!!errors.clientCode) ? <FormErrorMessage as='span' color='red.400' fontSize='xs'>{errors.clientCode.message}</FormErrorMessage>
                            : <>&nbsp;</>
                        }
                        <Button tabIndex={-1} size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientCodeInfo}>Info</Button>
                    </HStack>
                </FormControl>

                {/* client name  */}
                <FormControl isInvalid={!!errors.clientName}>
                    <FormLabel fontWeight='bold' htmlFor='clientName'>Client name <AppRequiredAstrisk /></FormLabel>
                    <Input placeholder='e.g Battle Ground' name='clientName' size='sm' type='text' {...registerClientName} autoComplete='off' />
                    <HStack justifyContent='space-between' >
                        {(!!errors.clientName) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.clientName.message}</FormErrorMessage>
                            : <>&nbsp;</>
                        }
                        <Button tabIndex={-1} size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button>
                    </HStack>
                </FormControl>

                {/* is active */}
                <FormControl>
                    <Checkbox id='isActive' size='lg' {...register('isActive')}>Is this client active?</Checkbox>
                </FormControl>

                <VStack pt={3}>
                    <HStack w='100%'> <Text fontSize='md' >External database connection details</Text></HStack>
                    <HStack>
                        {/* dbName */}
                        <FormControl isInvalid={!!errors.dbName}>
                            <FormLabel fontWeight='bold' htmlFor='host' fontSize='sm' >DB name <AppRequiredAstrisk /></FormLabel>
                            <Input placeholder='e.g battleground_accounts' name='dbName' size='sm' type='text' {...registerDbName} autoComplete='off' />
                            <HStack justifyContent='space-between' >
                                {(!!errors.dbName) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.host.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                                {/* <Button size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button> */}
                            </HStack>
                        </FormControl>

                        {/* host */}
                        <FormControl isInvalid={!!errors.host}>
                            <FormLabel fontWeight='bold' htmlFor='host' fontSize='sm' >DB host <AppRequiredAstrisk /></FormLabel>
                            <Input placeholder='e.g battleground.com' name='host' size='sm' type='text' {...registerHost} autoComplete='off' />
                            <HStack justifyContent='space-between' >
                                {(!!errors.host) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.host.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                                {/* <Button size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button> */}
                            </HStack>
                        </FormControl>
                    </HStack>

                    <HStack>
                        {/* user*/}
                        <FormControl isInvalid={!!errors.user}>
                            <FormLabel fontWeight='bold' htmlFor='user' fontSize='sm'>DB user name <AppRequiredAstrisk /></FormLabel>
                            <Input placeholder='john123' name='user' size='sm' type='text' {...registerUser} autoComplete='off' />
                            <HStack justifyContent='space-between' >
                                {(!!errors.user) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.user.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                                {/* <Button size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button> */}
                            </HStack>
                        </FormControl>

                        {/* password */}
                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel fontWeight='bold' htmlFor='password' fontSize='sm'>DB password <AppRequiredAstrisk /></FormLabel>
                            <Input name='password' size='sm' type='password' {...registerPassword} autoComplete='off' />
                            <HStack justifyContent='space-between' >
                                {(!!errors.password) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.password.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                                {/* <Button size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button> */}
                            </HStack>
                        </FormControl>
                    </HStack>

                    <HStack pl={3} pr={3}>
                        {/* port */}
                        <FormControl flex='1' isInvalid={!!errors.port}>
                            <FormLabel fontWeight='bold' htmlFor='port' fontSize='sm'>DB port <AppRequiredAstrisk /></FormLabel>
                            <Input placeholder='e.g 1234' name='port' size='sm' type='text' {...registerPort} autoComplete='off' />
                            {/* <NumberInput size='sm' name='port' {...registerPort}>
                                <NumberInputField />
                            </NumberInput> */}
                            <HStack justifyContent='space-between' >
                                {(!!errors.port) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.port.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                            </HStack>
                        </FormControl>

                        {/* url */}
                        <FormControl flex='2' isInvalid={!!errors.url}>
                            <FormLabel fontWeight='bold' fontSize='sm'>DB url</FormLabel>
                            <Input placeholder='e.g http://battledb.com' name='url' size='sm' type='text' {...registerUrl} autoComplete='off' />
                            <HStack justifyContent='space-between' >
                                {(!!errors.url) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.url.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                            </HStack>
                        </FormControl>
                    </HStack>
                    <HStack w='100%' justify='flex-end'>
                        {/* Test database connection */}
                        <Button mt={0} pt={0} size='xs' variant='outline' tabIndex={-1} colorScheme='teal' onClick={handleTestDb}>Test database connection</Button>
                    </HStack>
                    <Button w='100%' colorScheme='blue' type='submit' isDisabled={(!_.isEmpty(errors) || isSubmitDisabled)} >
                        Submit
                    </Button>
                    {/* </HStack> */}
                </VStack>
            </VStack>
        </form>
    )

    function handleClientCodeInfo() {
        showAlertDialogOk({ title: 'Client code information', body: <Box fontSize='lg' color='gray.900'>{Messages.messNoSpecialSpace4Plus}</Box> })
    }

    function handleClientNameInfo() {
        showAlertDialogOk({ title: 'Client name information', body: <Box fontSize='lg' color='gray.900'>{Messages.messNoSpecial4Plus}</Box> })
    }

    // function onSubmit(values:any){
    //     console.log('abcd')
    // }

    async function onSubmit(values: any) {
        const id = values?.id
        const dbParams: any = {
            dbName: values?.dbName,
            host: values?.host,
            user: values?.user,
            password: values?.password,
            port: values?.port,
            url: values?.url
        }
        const sqlObj = {
            tableName: 'TestM',
            xData: {
                id: id,
                clientCode: values?.clientCode,
                clientName: values?.clientName,
                dbName: values?.dbName,
                isActive: values?.isActive,
                isExternalDb: true,
                dbParams: JSON.stringify(dbParams)
            }
        }
        const q = appGraphqlStrings['genericUpdate'](sqlObj, 'traceAuth')
        try {
            setIsSubmitDisabled(true)
            showAppLoader(true)
            const result: GraphQlQueryResultType = await mutateGraphql(q)
            handleUpdateResult(result, () => {
                closeModalDialogA()
                appStaticStore.superAdmin.doReload()
            })
        } catch (e: any) {
            showError(Messages.errUpdatingData)
            console.log(e.message)
        } finally {
            showAppLoader(false)
            setIsSubmitDisabled(false)
        }


    }

    function setFormValues() {
        if (_.isEmpty(defaultData)) {
            return
        }
        for (const key in defaultData) {
            setValue(key, defaultData[key])
        }
    }

    async function handleTestDb() {
        const values = getValues()
        const dbParams: any = {
            // dbName: values?.dbName,
            host: values?.host,
            user: values?.user,
            password: values?.password,
            port: values?.port,
            // url: values?.url
        }
        const args = {
            sqlId: 'test_connection',
            dbParams: dbParams,
            toReconnect: true
        }
        const q = appGraphqlStrings['genericQuery'](args, values['dbName'])
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const res: any = result?.data?.genericQuery
            const showFailed: any = () => showAlertDialogOk({ title: 'Information', body: <Box color='red.400'>Connection failed</Box> })
            if (res) {
                if (res?.error) {
                    showFailed()
                } else {
                    if ((res.length > 0)) {
                        showAlertDialogOk({ title: 'Information', body: <Box color='green.400'>Connection successful</Box> })
                    } else {
                        showFailed()
                    }
                }
            } else {
                showFailed()
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        }
        // console.log(defaultData)
    }
}

export { SuperAdminEditNewClientExtDatabase }

type SuperAdminClientType = {
    clientCode: string
    clientName: string
    isActive: boolean
}
