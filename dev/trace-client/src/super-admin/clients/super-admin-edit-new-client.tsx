import {
    _, AppRequiredAstrisk, appStore, appValidators, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, GraphQlQueryResultType, HStack, Input,
    Messages, useDialogs, useAppGraphql, useFeedback,
    useForm, useQueryResult, VStack, appStaticStore, useEffect, useState, debounceFilterOn, ebukiMessages, debounceEmit,
} from '@src/features'
import { debounce } from 'lodash'


function SuperAdminEditNewClient() {
    const { handleUpdateResult, handleAndGetQueryResult } = useQueryResult()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, showAlertDialogOk, } = useDialogs()
    const { appGraphqlStrings, mutateGraphql, queryGraphql } = useAppGraphql()
    const { showAppLoader, showError } = useFeedback()
    const { checkNoSpaceOrSpecialChar, checkNoSpecialChar } = appValidators()
    const { handleSubmit, register, formState: { errors }, setError, setValue, }: any = useForm<SuperAdminClientType>({ mode: 'onTouched' })
    const defaultData = appStore.modalDialogA.defaultData.value

    useEffect(() => {
        setFormValues()
        const subs1 = debounceFilterOn(ebukiMessages.clientCodeChangeDebounce.toString(), 1200).subscribe(
            (d: any) => {
                getClient(d.data)
            })
        return (() => {
            subs1.unsubscribe()
        })
    }, [])



    const registerClientCode = register('clientCode', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
        , validate: {
            noSpaceOrSpecialChar: (val: string) => checkNoSpaceOrSpecialChar(val),
            asyncValid: (val: string) => {
                debounceEmit(ebukiMessages.clientCodeChangeDebounce.toString(), val)
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
            <VStack spacing={4}>
                <FormControl isInvalid={!!errors.clientCode}>
                    <FormLabel fontWeight='bold'>Client code <AppRequiredAstrisk /></FormLabel>
                    <Input name='clientCode' placeholder='e.g battleGround' autoFocus size='sm' type='text' {...registerClientCode} autoComplete='off' />
                    <HStack justifyContent='space-between' alignItems='center'>
                        {(!!errors.clientCode) ? <FormErrorMessage color='red.400' mt={0} fontSize='xs'>{errors.clientCode.message}</FormErrorMessage>
                            : <>&nbsp;</>
                        }
                        <Button tabIndex={-1} size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientCodeInfo}>Info</Button>
                    </HStack>
                </FormControl>

                <FormControl isInvalid={!!errors.clientName}>
                    <FormLabel fontWeight='bold'>Client name <AppRequiredAstrisk /></FormLabel>
                    <Input name='clientName' placeholder='e.g Battle Ground' size='sm' type='text' {...registerClientName} autoComplete='off' />
                    <HStack justifyContent='space-between' >
                        {(!!errors.clientName) ? <FormErrorMessage mt={0} color='red.400' fontSize='xs'>{errors.clientName.message}</FormErrorMessage>
                            : <>&nbsp;</>
                        }
                        <Button tabIndex={-1} size='xs' variant='unstyled' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button>
                    </HStack>
                </FormControl>

                <FormControl>
                    <Checkbox name='isActive' size='lg' {...register('isActive')}>Is this client active?</Checkbox>
                </FormControl>

                <HStack justifyContent='flex-end' w='100%'>
                    <Button w='100%' colorScheme='blue' type='submit' isDisabled={(!_.isEmpty(errors) || isSubmitDisabled)} >
                        Submit
                    </Button>
                </HStack>
            </VStack>
        </form>
    )

    async function getClient(clientCode: string) {
        const args = {
            sqlId: 'get_client',
            sqlArgs: {
                clientCode: clientCode
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        let ret = undefined
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows && (rows.length > 0)) {
                setError('clientCode', {
                    type: '400',
                    message: Messages.errClientExists
                })
            }
        } catch (e: any) {
            console.log(e)
        }
        return (ret)
    }

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

        const q = appGraphqlStrings['updateClient'](sqlObj, 'traceAuth')
        try {
            setIsSubmitDisabled(true)
            showAppLoader(true)
            const result: GraphQlQueryResultType = await mutateGraphql(q)
            handleUpdateResult(result, () => {
                closeModalDialogA()
                appStaticStore.superAdmin.doReload()
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