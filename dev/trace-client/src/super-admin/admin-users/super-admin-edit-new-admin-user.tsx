import {
    _, AppRequiredAstrisk, appStore, appValidators, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, GraphQlQueryResultType, HStack, Input,
    Messages, ReactSelect, useDeepSignal, useDialogs, useAppGraphql, useFeedback,
    useForm, VStack, appStaticStore, useEffect, useState, debounceFilterOn, ebukiMessages, debounceEmit, useGranularEffect, NumberInput, NumberInputField,
} from '@src/features'

import { Select } from 'chakra-react-select'
import { Controller } from 'react-hook-form'

function SuperAdminEditNewAdminUser() {
    const meta: any = useDeepSignal({ clients: [], selectedClient: {} })
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, } = useDialogs()
    const { showAppLoader, showError } = useFeedback()
    const { appGraphqlStrings, handleAndGetQueryResult, mutateGraphql, queryGraphql } = useAppGraphql()
    const { checkIndiaMobileNo, checkNoSpaceOrSpecialChar, checkValidEmail } = appValidators()
    const { control, handleSubmit, register, formState: { errors }, setError, setValue, }: any = useForm({ mode: 'onTouched' })
    const defaultData = appStore.modalDialogA.defaultData.value

    useGranularEffect(() => {
        setFormValues()
        loadClients()
    }, [], [loadClients, setFormValues])


    const registerUserName = register('userName', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
        , validate: {
            noSpaceOrSpecialChar: (val: string) => checkNoSpaceOrSpecialChar(val),
        }
    })

    const registerMobileNo = register('mobileNo', {
        required: Messages.errRequired
        , validate: {
            mobileNumber: (val: string) => checkIndiaMobileNo(val),
        }
    })

    const registerUserEmail = register('userEmail', {
        required: Messages.errRequired
        , validate: {
            validEmail: (val: string) => checkValidEmail(val)
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>

                {/* Client*/}
                {/* chakra-react-select is used with react-hook-form. It is uncontrolled control. Hence Controller is used */}
                <Controller
                    control={control}
                    name='client'
                    rules={{ required: Messages.errRequired }}
                    render={
                        ({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { error }
                        }) => (
                            <FormControl isInvalid={!!error} id="client">
                                <FormLabel fontWeight='bold'>Client <AppRequiredAstrisk /></FormLabel>
                                <Select
                                    size='sm'
                                    // isMulti
                                    name={name}
                                    ref={ref}
                                    onChange={onChange}
                                    onBlur={onBlur}

                                    value={value || ''}
                                    options={meta.clients.value}
                                    placeholder="Select client"
                                />
                                {(!!error) ? <FormErrorMessage color='red.400' fontSize='xs'>{error.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                            </FormControl>
                        )
                    }
                />

                {/* User name */}
                <FormControl isInvalid={!!errors.userName}>
                    <FormLabel fontWeight='bold'>User name <AppRequiredAstrisk /></FormLabel>
                    <Input name='userName' placeholder='e.g Robert Fedrik' size='sm' type='text' {...registerUserName} autoComplete='off' />
                    {(!!errors.userName) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.userName.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
                </FormControl>

                {/* User email */}
                <FormControl isInvalid={!!errors.userEmail}>
                    <FormLabel fontWeight='bold'>Email <AppRequiredAstrisk /></FormLabel>
                    <Input name='userEmail' placeholder='e.g Robert@mycompany.com' size='sm' type='text' {...registerUserEmail} autoComplete='off' />
                    {(!!errors.userEmail) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.userEmail.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
                </FormControl>

                {/* Mobile no */}
                <FormControl isInvalid={!!errors.mobileNo}>
                    <FormLabel fontWeight='bold' htmlFor='port' fontSize='sm'>Mobile number <AppRequiredAstrisk /></FormLabel>
                    <NumberInput size='sm'>
                        <NumberInputField name='mobileNumber' placeholder='e.g 9999999999' {...registerMobileNo} autoComplete='off' />
                    </NumberInput>
                    {(!!errors.mobileNo) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.mobileNo.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
                </FormControl>

                {/* Description */}
                <FormControl>
                    <FormLabel fontWeight='bold'>Description</FormLabel>
                    <Input name='descr' size='sm' type='text' autoComplete='off' {...register('descr')} />
                </FormControl>

                <FormControl>
                    <Checkbox name='isActive' size='lg' {...register('isActive')}>Is this user active?</Checkbox>
                </FormControl>

                <HStack w='100%'>
                    <Button mt={5} w='100%' colorScheme='blue' type='submit' isDisabled={(!_.isEmpty(errors) || isSubmitDisabled)} >
                        Submit
                    </Button>
                </HStack>
            </VStack>
        </form>
    )

    async function loadClients() {
        const args = {
            sqlId: 'get_all_clientNames_clentIds'
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        showAppLoader(true)
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: [] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows) {
                const arr: any[] = rows.map((item: any) => {
                    return ({ value: item.id, label: item.clientName })
                })
                meta.clients.value = [...arr]
            }
            if (!_.isEmpty(defaultData)) {
                const clients: any[] = meta.clients.value
                const selectedClient = clients.find((x: any) => (x.value === defaultData.clientId))
                setValue('client', selectedClient)
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            showAppLoader(false)
        }
    }

    async function onSubmit(values: any) {
        const id = values?.id
        const sqlObj = {
            tableName: 'UserM',
            xData: {
                id: id,
                userName: values?.['userName'],
                userEmail: values?.['userEmail'],
                mobileNo: values?.['mobileNo'],
                descr: values?.['descr'],
                isActive: values?.['isActive'],
                clientId: values?.['client'].value,
            }
        }
        const q = appGraphqlStrings['updateUser'](sqlObj, 'traceAuth')
        try {
            setIsSubmitDisabled(true)
            showAppLoader(true)
            const result: GraphQlQueryResultType = await mutateGraphql(q)
            handleUpdateResult(result, () => {
                closeModalDialogA()
                appStaticStore.superAdmin.adminUsers.doReload()
            }, 'updateUser')
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

export { SuperAdminEditNewAdminUser }