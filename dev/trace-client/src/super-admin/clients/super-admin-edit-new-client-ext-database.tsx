import {
    _, appStore, appValidators, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, HStack, Input,
    Messages, useDialogs, useAppGraphql, useFeedback,
    useForm, VStack, appStaticStore, useEffect, useState, Text, Flex,
} from '@src/features'


function SuperAdminEditNewClientExtDatabase() {
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, showAlertDialogOk, } = useDialogs()
    const { appGraphqlStrings, } = useAppGraphql()
    const { showSuccess } = useFeedback()
    const { checkNoSpaceOrSpecialChar, checkNoSpecialChar } = appValidators()
    const { handleSubmit, register, formState: { errors }, setValue, }: any = useForm<SuperAdminClientType>({ mode: 'onTouched' })
    const defaultData = appStore.modalDialogA.defaultData.value

    useEffect(() => {
        setFormValues()
    }, [])

    const registerClientCode = register('clientCode', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
        , validate: {
            noSpaceOrSpecialChar: (val: string) => checkNoSpaceOrSpecialChar(val),
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
            noSpecialChar: checkNoSpecialChar
        }
    })
    const registerUserName = register('userName', {
        minLength: { value: 4, message: Messages.errAtLeast4Chars },
        required: Messages.errRequired
        , validate: {
            noSpaceOrSpecialChar: checkNoSpecialChar
        }
    })
    const registerPassword = register('password', {
        minLength: { value: 4, message: Messages.errAtLeast4Chars },
        required: Messages.errRequired
        , validate: {
            noSpaceOrSpecialChar: checkNoSpecialChar
        }
    })
    const registerPort = register('port', {
        required: Messages.errRequired
        , validate: {
            noSpaceOrSpecialChar: checkNoSpecialChar
        }
    })
    const registerUrl = register('url', {
        required: Messages.errRequired
        , validate: {
            noSpaceOrSpecialChar: checkNoSpecialChar
        }
    })
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>

                {/* client code */}
                <FormControl isInvalid={!!errors.clientCode}>
                    <FormLabel>Client code</FormLabel>
                    <Input id='clientCode' autoFocus size='sm' type='text' {...registerClientCode} autoComplete='off' />
                    <HStack justifyContent='space-between' alignItems='center'>
                        {(!!errors.clientCode) ? <FormErrorMessage color='red.400' mt={0} fontSize='xs'>{errors.clientCode.message}</FormErrorMessage>
                            : <>&nbsp;</>
                        }
                        <Button size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientCodeInfo}>Info</Button>
                    </HStack>
                </FormControl>

                {/* client name  */}
                <FormControl isInvalid={!!errors.clientName}>
                    <FormLabel>Client name</FormLabel>
                    <Input id='clientName' size='sm' type='text' {...registerClientName} autoComplete='off' />
                    <HStack justifyContent='space-between' >
                        {(!!errors.clientName) ? <FormErrorMessage mt={0} color='red.400' fontSize='xs'>{errors.clientName.message}</FormErrorMessage>
                            : <>&nbsp;</>
                        }
                        <Button size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button>
                    </HStack>
                </FormControl>

                {/* is active */}
                <FormControl>
                    <Checkbox id='isActive' size='lg' {...register('isActive')}>Is this client active?</Checkbox>
                </FormControl>

                <VStack  pt={10}>
                    <HStack w='100%'> <Text fontSize='md' fontWeight='bold'>Database connection details</Text></HStack>
                    <HStack>
                        {/* host */}
                        <FormControl isInvalid={!!errors.host}>
                            <FormLabel fontSize='sm'>DB host</FormLabel>
                            <Input id='host' size='sm' type='text' {...registerHost} autoComplete='off' />
                            <HStack justifyContent='space-between' >
                                {(!!errors.host) ? <FormErrorMessage mt={0} color='red.400' fontSize='xs'>{errors.host.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                                {/* <Button size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button> */}
                            </HStack>
                        </FormControl>

                        {/* user name */}
                        <FormControl isInvalid={!!errors.userName}>
                            <FormLabel fontSize='sm'>DB user name</FormLabel>
                            <Input id='userName' size='sm' type='text' {...registerUserName} autoComplete='off' />
                            <HStack justifyContent='space-between' >
                                {(!!errors.userName) ? <FormErrorMessage mt={0} color='red.400' fontSize='xs'>{errors.userName.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                                {/* <Button size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button> */}
                            </HStack>
                        </FormControl>
                    </HStack>
                    <HStack p={0} m={0}>
                        {/* password */}
                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel fontSize='sm'>DB password</FormLabel>
                            <Input id='password' size='sm' type='text' {...registerPassword} autoComplete='off' />
                            <HStack justifyContent='space-between' >
                                {(!!errors.password) ? <FormErrorMessage mt={0} color='red.400' fontSize='xs'>{errors.password.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                                {/* <Button size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button> */}
                            </HStack>
                        </FormControl>

                        {/* port */}
                        <FormControl isInvalid={!!errors.port}>
                            <FormLabel fontSize='sm'>DB port</FormLabel>
                            <Input id='port' size='sm' type='text' {...registerPort} autoComplete='off' />
                            <HStack justifyContent='space-between' >
                                {(!!errors.port) ? <FormErrorMessage mt={0} color='red.400' fontSize='xs'>{errors.port.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                                {/* <Button size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button> */}
                            </HStack>
                        </FormControl>
                    </HStack>

                    {/* url */}
                    <FormControl isInvalid={!!errors.url}>
                        <FormLabel fontSize='sm'>DB url (optional)</FormLabel>
                        <Input id='url' size='sm' type='text' {...registerUrl} autoComplete='off' />
                        <HStack justifyContent='space-between' >
                            {(!!errors.url) ? <FormErrorMessage mt={0} color='red.400' fontSize='xs'>{errors.url.message}</FormErrorMessage>
                                : <>&nbsp;</>
                            }
                            {/* <Button size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button> */}
                        </HStack>
                    </FormControl>
                    {/* <HStack justifyContent='flex-end' w='100%'> */}
                        <Button w='100%' mt={2} colorScheme='blue' type='submit' disabled={(!_.isEmpty(errors)) || isSubmitDisabled} >
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

    async function onSubmit(values: any) {
        const id = values?.id
        const sqlObj = {
            tableName: 'TestM',
            xData: {
                ...values,
            }
        }
        if (!id) { //insert
            sqlObj.xData.dbName = `${values.clientCode}_accounts`
        }
        const q = appGraphqlStrings['genericUpdate'](sqlObj, 'traceAuth')
        setIsSubmitDisabled(true)
        setIsSubmitDisabled(false)
        closeModalDialogA()
        appStaticStore.superAdmin.doReload()
        showSuccess()
    }

    function setFormValues() {
        if (_.isEmpty(defaultData)) {
            return
        }
        for (const key in defaultData) {
            setValue(key, defaultData[key])
        }
    }
}

export { SuperAdminEditNewClientExtDatabase }

type SuperAdminClientType = {
    clientCode: string
    clientName: string
    isActive: boolean
}