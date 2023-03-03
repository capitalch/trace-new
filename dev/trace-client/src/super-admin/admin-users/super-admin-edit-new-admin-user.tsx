import {
    _, AppRequiredAstrisk, appStore, appValidators, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, GraphQlQueryResultType, HStack, Input,
    Messages, ReactSelect, useDialogs, useAppGraphql, useFeedback,
    useForm, VStack, appStaticStore, useState, debounceFilterOn, ebukiMessages, debounceEmit, useGranularEffect, NumberInput, NumberInputField, Select,
} from '@src/features'

function SuperAdminEditNewAdminUser() {
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, } = useDialogs()
    const { showAppLoader, showError } = useFeedback()
    const { appGraphqlStrings, handleAndGetQueryResult, mutateGraphql, queryGraphql } = useAppGraphql()
    const { checkIndiaMobileNo, checkNoSpaceOrSpecialChar, checkValidEmail } = appValidators()
    const { handleSubmit, register, formState: { errors }, setError, setValue, }: any = useForm({ mode: 'onTouched' })

    const defaultData = appStore.modalDialogA.defaultData.value

    const registerClientId = register('clientId', {
        required: Messages.errRequired
        , validate: {
            // noSpaceOrSpecialChar: (val: string) => checkNoSpaceOrSpecialChar(val),
        }
    })

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

    const options = [
        { value: null, label: '--- Select ---' },
        { value: 1, label: 'Capital group' },
        { value: 2, label: 'Netwoven group' }
    ]

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                {/* Client id */}
                <FormControl isInvalid={!!errors.clintId}>
                    <FormLabel fontWeight='bold'>Client <AppRequiredAstrisk /></FormLabel>
                    <ReactSelect options={options}  />
                        {/* <Select size='sm' w='0.5xs' variant='filled' 
                    defaultValue={appStoreObject.noOfRows.value} onChange={handleOnSelectRows}
                    >
                    <option value='100'>Last 100 rows</option>
                    <option value='1000'>Last 1000 rows</option>
                    <option value=''>All rows</option>
                </Select> */}
                        {(!!errors.clintId) ? <FormErrorMessage color='red.400' mt={2} fontSize='xs'>{errors.clintId.message}</FormErrorMessage>
                            : <>&nbsp;</>
                        }
                </FormControl>

                {/* User name */}
                <FormControl isInvalid={!!errors.userName} mt={0} pt={0}>
                    <FormLabel fontWeight='bold'>User name <AppRequiredAstrisk /></FormLabel>
                    <Input name='userName' placeholder='e.g Robert Fedrik' autoFocus size='sm' type='text' {...registerUserName} autoComplete='off' />
                    {(!!errors.userName) ? <FormErrorMessage color='red.400' mt={2} fontSize='xs'>{errors.userName.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
                </FormControl>

                {/* User email */}
                <FormControl isInvalid={!!errors.userEmail}>
                    <FormLabel fontWeight='bold'>Email <AppRequiredAstrisk /></FormLabel>
                    <Input name='userEmail' placeholder='e.g Robert@mycompany.com' size='sm' type='text' {...registerUserEmail} autoComplete='off' />
                    {(!!errors.userEmail) ? <FormErrorMessage color='red.400' mt={2} fontSize='xs'>{errors.userEmail.message}</FormErrorMessage>
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

    function onSubmit(values: any) {

    }
}

export { SuperAdminEditNewAdminUser }