import {
    _, AppRequiredAstrisk, appStore, appValidators, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, GraphQlQueryResultType, HStack, Input,
    Messages, ReactSelect, useDeepSignal, useDialogs, useAppGraphql, useFeedback,
    useForm, VStack, appStaticStore, useEffect, useState, debounceFilterOn, ebukiMessages, debounceEmit, useGranularEffect, NumberInput, NumberInputField,
} from '@src/features'

import { Select } from 'chakra-react-select'

function SuperAdminEditNewAdminUser() {
    const meta: any = useDeepSignal({ clients: [], selectedClient: {} })
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, } = useDialogs()
    const { showAppLoader, showError } = useFeedback()
    const { appGraphqlStrings, handleAndGetQueryResult, mutateGraphql, queryGraphql } = useAppGraphql()
    const { checkIndiaMobileNo, checkNoSpaceOrSpecialChar, checkValidEmail } = appValidators()
    const { handleSubmit, register, formState: { errors }, setError, setValue, }: any = useForm({ mode: 'onTouched' })

    const defaultData = appStore.modalDialogA.defaultData.value

    useGranularEffect(() => {
        setValue('clientId', meta.selectedClient.value.value)
        setError('clientId', undefined)
        loadClients()
    }, [], [loadClients])

    // const registerClientId = register('clientId', {
    // required: Messages.errRequired
    // validate: {
    // }
    // })

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
                {/* Client id */}
                <FormControl isInvalid={!!errors.clintId}>
                    <FormLabel fontWeight='bold'>Client <AppRequiredAstrisk /></FormLabel>
                    <Select
                        name='clientId'
                        size='sm'
                        options={meta.clients.value}
                        value={meta.selectedClient.value.value}
                        onChange={onClientSelected}
                        // {...register('clientId')}
                    // {...registerClientId} 
                    />
                    {/* <ReactSelect  placeholder='Select'
                        options={meta.clients.value} autoFocus
                        value={meta.selectedClient.value.value}
                        onChange={onClientSelected}
                        {...registerClientId} 
                        /> */}
                    {/* <Select size='sm' w='0.5xs' variant='filled' 
                    defaultValue={appStoreObject.noOfRows.value} onChange={handleOnSelectRows}
                    >
                    <option value='100'>Last 100 rows</option>
                    <option value='1000'>Last 1000 rows</option>
                    <option value=''>All rows</option>
                </Select> */}
                    {(!!errors.clintId) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.clintId.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
                </FormControl>

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
                meta.clients.value = [{ value: '', label: '--- select ---' }, ...arr]
                // appStore.superAdmin.securedControls.rows.value = rows
                // appStaticStore.superAdmin.securedControls.doFilter()
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            showAppLoader(false)
        }
    }

    function onClientSelected(selectedItem: any) {
        meta.selectedClient.value.value = selectedItem.value//selectedItem
        setValue('clientId', selectedItem.value)
        if (!selectedItem.value) {
            setError('clientId', { type: 'custom', message: 'This value is required' })
        } else {
            setError('clientId',  { type: 'custom', message: '' })
        }
        // registerClientId()
    }

    async function onSubmit(values: any) {
        console.log(values)
    }
}

export { SuperAdminEditNewAdminUser }