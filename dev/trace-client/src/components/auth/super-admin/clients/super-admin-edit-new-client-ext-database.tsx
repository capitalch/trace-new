import {
    _, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, HStack, Input,
    NumberInput, NumberInputField,
    useForm, VStack, useState, Text, useGranularEffect,
} from '@src/libs'
import { AppCheckbox, appStore, appValidators, GraphQlQueryResultType, Messages, useDialogs, useAppGraphql, AppRequiredAstrisk, useFeedback, debounceFilterOn, ebukiMessages, debounceEmit, } from '@src/features'
import { useSuperAdminClientsCommon } from './super-admin-clients-common-hook'

function SuperAdminEditNewClientExtDatabase() {
    const [, setRefresh] = useState({})
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const [isTestDbDisabled, setTestDbDisabled] = useState(false)
    const { handleUpdateResult, } = useAppGraphql()
    const { closeModalDialogA, showAlertDialogOk, } = useDialogs()
    const { appGraphqlStrings, mutateGraphql, queryGraphql } = useAppGraphql()
    const { showAppLoader, showError } = useFeedback()
    const { checkNumeric, checkNoSpace, checkNoSpaceOrSpecialChar, checkNoSpecialChar, checkUrl, shouldNotBeZero } = appValidators()
    const { getValues, handleSubmit, register, formState: { errors }, setError, setValue, }: any = useForm({ mode: 'all' })
    const { validateClientCode } = useSuperAdminClientsCommon()
    const defaultData = appStore.modalDialogA.defaultData.value

    useGranularEffect(() => {
        setFormValues()
        const subs1 = debounceFilterOn(ebukiMessages.clientCodeChangeDebounce.toString(), 1200).subscribe(
            (d: any) => {
                validateClientCode(d.data, setError)
            })
        return (() => {
            subs1.unsubscribe()
        })
    }, [], [validateClientCode, setFormValues])

    const registerClientCode = register('clientCode', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
        , validate: {
            noSpaceOrSpecialChar: checkNoSpaceOrSpecialChar,
            validate: (val: string) => {
                if (_.isEmpty(defaultData)) { // Allow unique clientCode validation only when inserting data
                    debounceEmit(ebukiMessages.clientCodeChangeDebounce.toString(), val)
                }
            }
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
            // onlyNumeric: checkNumeric,
            shouldNotBeZero: shouldNotBeZero
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
                <AppCheckbox name='isActive' label='Is this client active?' func={register} />

                <VStack pt={3}>
                    <HStack w='100%'> <Text fontSize='md' >External database connection details</Text></HStack>
                    <HStack>

                        {/* dbName */}
                        <FormControl isInvalid={!!errors.dbName}>
                            <FormLabel fontWeight='bold' htmlFor='host' fontSize='sm' >DB name <AppRequiredAstrisk /></FormLabel>
                            <Input placeholder='e.g battleground_accounts' name='dbName' size='sm' type='text' {...registerDbName} autoComplete='off' />

                            {(!!errors.dbName) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.dbName.message}</FormErrorMessage>
                                : <>&nbsp;</>
                            }
                        </FormControl>

                        {/* host */}
                        <FormControl isInvalid={!!errors.host}>
                            <FormLabel fontWeight='bold' htmlFor='host' fontSize='sm' >DB host <AppRequiredAstrisk /></FormLabel>
                            <Input placeholder='e.g battleground.com' name='host' size='sm' type='text' {...registerHost} autoComplete='off' />
                            {(!!errors.host) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.host.message}</FormErrorMessage>
                                : <>&nbsp;</>
                            }
                        </FormControl>
                    </HStack>

                    <HStack>
                        {/* user*/}
                        <FormControl isInvalid={!!errors.user}>
                            <FormLabel fontWeight='bold' htmlFor='user' fontSize='sm'>DB user name <AppRequiredAstrisk /></FormLabel>
                            <Input placeholder='john123' name='user' size='sm' type='text' {...registerUser} autoComplete='off' />
                            {(!!errors.user) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.user.message}</FormErrorMessage>
                                : <>&nbsp;</>
                            }
                        </FormControl>

                        {/* password */}
                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel fontWeight='bold' htmlFor='password' fontSize='sm'>DB password <AppRequiredAstrisk /></FormLabel>
                            <Input name='password' size='sm' type='password' {...registerPassword} autoComplete='off' />
                            {(!!errors.password) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.password.message}</FormErrorMessage>
                                : <>&nbsp;</>
                            }
                        </FormControl>
                    </HStack>

                    <HStack pl={3} pr={3}>
                        {/* port */}
                        <FormControl flex='1' isInvalid={!!errors.port}>
                            <FormLabel fontWeight='bold' htmlFor='port' fontSize='sm'>DB port <AppRequiredAstrisk /></FormLabel>

                            {/* <NumberInput size='sm'> */}
                            {/* <NumberInputField name='port' type='number' placeholder='e.g 5432' {...registerPort} /> */}
                            <Input name='port' size='sm' type='number' {...registerPort} />
                            {/* </NumberInput> */}
                            {(!!errors.port) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.port.message}</FormErrorMessage>
                                : <>&nbsp;</>
                            }
                        </FormControl>

                        {/* url */}
                        <FormControl flex='2' isInvalid={!!errors.url}>
                            <FormLabel fontWeight='bold' fontSize='sm'>DB url</FormLabel>
                            <Input placeholder='e.g http://battledb.com' name='url' size='sm' type='text' {...registerUrl} autoComplete='off' />
                            {(!!errors.url) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.url.message}</FormErrorMessage>
                                : <>&nbsp;</>
                            }
                        </FormControl>
                    </HStack>

                    <HStack w='100%' justify='flex-end'>
                        {/* Test database connection */}
                        <Button isDisabled={isTestDbDisabled || isDbParamsError()} mt={0} pt={0} size='xs' variant='outline' tabIndex={-1} colorScheme='teal' onClick={handleTestDb}>Test database connection</Button>
                    </HStack>

                    <Button w='100%' colorScheme='blue' type='submit' isDisabled={(!_.isEmpty(errors) || isSubmitDisabled)} >
                        Submit
                    </Button>
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

    async function onSubmit(values: any) {
        if (_.isEmpty(defaultData)) { // Allow unique clientCode validation only when inserting data
            const error = await validateClientCode(values.clientCode, setError)
            if (error) {
                return
            }
        }
        const id = values?.id
        const dbParams: any = {
            dbName: values?.dbName,
            host: values?.host,
            user: values?.user,
            password: values?.password,
            port: +values?.port,
            url: values?.url
        }
        const sqlObj = {
            tableName: 'ClientM',
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
        const q = appGraphqlStrings['updateClient'](sqlObj, 'traceAuth')
        try {
            setIsSubmitDisabled(true)
            showAppLoader(true)
            const result: GraphQlQueryResultType = await mutateGraphql(q)
            handleUpdateResult(result, () => {
                closeModalDialogA()
                appStore.superAdmin.clients.doReload()
            }, 'updateClient')
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
        setRefresh({}) // Forced refresh to run isDbParamsError() function. Otherwise the "Test database connection" button is not active in edit mode.
    }

    async function handleTestDb() {
        const showFailed: any = () => showAlertDialogOk({ title: 'Information', body: () => <Box color='red.400'>Connection failed</Box> })
        if (isDbParamsError()) {
            showFailed()
            return
        }
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
        setTestDbDisabled(true)
        try {
            showAppLoader(true)
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const res: any = result?.data?.genericQuery
            if (res) {
                if (res?.error) {
                    showFailed()
                } else {
                    if ((res.length > 0)) {
                        showAlertDialogOk({ title: 'Information', body: () => <Box color='green.400'>Connection successful</Box> })
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
        finally {
            setTestDbDisabled(false)
            showAppLoader(false)
        }
    }

    function isDbParamsError() {
        const values = getValues()
        const ret1: boolean = !(values?.dbName && values?.host && values?.user && values?.password && values?.port)
        const ret2: boolean = errors!.dbName || errors?.host || errors?.user || errors?.password || errors?.port
        const ret: boolean = !!(ret1 || ret2)
        return (ret)
    }
}

export { SuperAdminEditNewClientExtDatabase }


/*
<FormControl>
    <Checkbox id='isActive' size='lg' {...register('isActive')}>Is this client active?</Checkbox>
</FormControl>
 <HStack justifyContent='space-between' >
  <Input placeholder='e.g 1234' name='port' size='sm' type='text' {...registerPort} autoComplete='off' />
*/