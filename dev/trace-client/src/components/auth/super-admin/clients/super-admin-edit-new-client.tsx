import {
    AppRequiredAstrisk, appStore, appValidators, GraphQlQueryResultType,
    Messages, useDialogs, useAppGraphql, useFeedback,
    debounceFilterOn, ebukiMessages, debounceEmit,
} from '@src/features'
import {
    _, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, HStack, Input, useForm, VStack, useState, useGranularEffect,
} from '@src/libs'
import { useSuperAdminClientsCommon } from './super-admin-clients-common-hook'

function SuperAdminEditNewClient() {
    const [, setRefresh] = useState({})
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, showAlertDialogOk, } = useDialogs()
    const { appGraphqlStrings, mutateGraphql, } = useAppGraphql()
    const { showAppLoader, showError } = useFeedback()
    const { checkNoSpaceOrSpecialChar, checkNoSpecialChar } = appValidators()
    const { handleSubmit, register, getValues, formState: { errors }, setError, setValue, }: any = useForm({ mode: 'onTouched' })
    const { validateClientCode } = useSuperAdminClientsCommon()
    const defaultData = appStore.modalDialogA.defaultData.value

    useGranularEffect(() => {
        setFormValues()
        const subs1 = debounceFilterOn(ebukiMessages.clientCodeChangeDebounce.toString(), 1200).subscribe(
            (d: any) => {
                validateClientCode(d.data, setError)
            })
        // setRefresh({})
        return (() => {
            subs1.unsubscribe()
        })

    }, [], [validateClientCode, setFormValues])



    const registerClientCode = register('clientCode', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
        , validate: {
            noSpaceOrSpecialChar: (val: string) => checkNoSpaceOrSpecialChar(val),
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                <FormControl isInvalid={!!errors.clientCode}>
                    <FormLabel fontWeight='bold'>Client code <AppRequiredAstrisk /></FormLabel>
                    <Input name='clientCode' placeholder='e.g battleGround' autoFocus size='sm' type='text' {...registerClientCode} autoComplete='off' />
                    <HStack justifyContent='space-between' alignItems='center'>
                        {(!!errors.clientCode) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.clientCode.message}</FormErrorMessage>
                            : <>&nbsp;</>
                        }
                        <Button tabIndex={-1} size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientCodeInfo}>Info</Button>
                    </HStack>
                </FormControl>

                <FormControl isInvalid={!!errors.clientName}>
                    <FormLabel fontWeight='bold'>Client name <AppRequiredAstrisk /></FormLabel>
                    <Input name='clientName' placeholder='e.g Battle Ground' size='sm' type='text' {...registerClientName} autoComplete='off' />
                    <HStack justifyContent='space-between' >
                        {(!!errors.clientName) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.clientName.message}</FormErrorMessage>
                            : <>&nbsp;</>
                        }
                        <Button tabIndex={-1} size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button>
                    </HStack>
                </FormControl>

                <FormControl display='flex' flexDir='row' alignItems='center' columnGap={2} >
                    <input cursor='pointer' name='isActive' id = 'isActive' {...register('isActive')} type = 'checkbox' 
                    style = {{width: '20px', height: '20px', cursor:'pointer',}} />
                    <label  htmlFor='isActive' style={{cursor:'pointer'}}>Is this client active?</label>
                    {/* <Checkbox name='isActive' id = 'isActive' size='lg' {...register('isActive')}>Is this client active?</Checkbox> */}
                </FormControl>

                <HStack justifyContent='flex-end' w='100%'>
                    <Button w='100%' colorScheme='blue' type='submit' isDisabled={(!_.isEmpty(errors) || isSubmitDisabled)} >
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
        if (_.isEmpty(defaultData)) { // Allow unique clientCode validation only when inserting data
            const error = await validateClientCode(values.clientCode, setError)
            if (error) {
                return
            }
        }
        const id = values?.id
        const sqlObj = {
            tableName: 'ClientM',
            xData: {
                ...values,
            }
        }
        if (!id) { //insert
            sqlObj.xData.dbName = `${values.clientCode}_accounts`
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
        const val = getValues('isActive')
        console.log(val)
    }
}

export { SuperAdminEditNewClient }