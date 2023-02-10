import {
    _, appStore, appValidators, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, HStack, Input,
    Messages, useDialogs, useAppGraphql, useFeedback,
    useForm, VStack, appStaticStore, useEffect, useState,
} from '@src/features'


function SuperAdminEditNewClient() {
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, showAlertDialogOk, } = useDialogs()
    const { appGraphqlStrings, mutateGraphql, } = useAppGraphql()
    const { showSuccess } = useFeedback()
    const { checkNoSpaceOrSpecialChar, checkNoSpecialChar } = appValidators()
    const {  handleSubmit, register, formState: { errors }, setValue,}: any = useForm<SuperAdminClientType>({ mode: 'onTouched' })
    const defaultData = appStore.modalDialogA.defaultData.value

    useEffect(() => {
        setFormValues()
    }, [])

    const registerClientCode = register('clientCode', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
        , validate: {
            noSpaceOrSpecialChar: (val: string) => checkNoSpaceOrSpecialChar(val),
            // asyncValid: async (val:string)=> {
            //     await sleep(1000)
            //     return 'async validation'
            // }
        }
    })
    const registerClientName = register('clientName', {
        required: Messages.errRequired
        , validate: {
            noSpecialChar: checkNoSpecialChar
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
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

                <FormControl>
                    <Checkbox id='isActive' size='lg' {...register('isActive')}>Is this client active?</Checkbox>
                </FormControl>

                <HStack justifyContent='flex-end' w='100%'>
                    <Button w='100%' colorScheme='blue' type='submit' disabled={(!_.isEmpty(errors)) || isSubmitDisabled} >
                        Submit
                    </Button>
                </HStack>
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

export { SuperAdminEditNewClient }

type SuperAdminClientType = {
    clientCode: string
    clientName: string
    isActive: boolean
}

// const st = new Date().getTime()
// const ret = await mutateGraphql(q)
// const en = (new Date()).getTime()
// console.log(en - st, ret)