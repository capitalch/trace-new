import {
    AppRequiredAstrisk, appStore, appValidators, GraphQlQueryResultType,
    Messages, useDialogs, useAppGraphql, useFeedback,

} from '@src/features'
import {
    _, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, useSignal, HStack, Input, useForm, VStack, useState, useGranularEffect, NumberInput, NumberInputField, Box,
} from '@src/libs'

import { Select } from 'chakra-react-select'
import { Controller } from 'react-hook-form'

function AdminEditNewBusinessUser() {
    const meta: any = 
        {
            roles: useSignal([])
            , selectedRole: useSignal({})
            , bues: useSignal([])
            , selectedBues: useSignal([])
            , origBuIdsJson: useSignal([])
        }
    
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, } = useDialogs()
    const { showAppLoader, showError } = useFeedback()
    const { appGraphqlStrings, handleAndGetQueryResult, mutateGraphql, queryGraphql } = useAppGraphql()
    const { checkIndiaMobileNo, checkNoSpecialChar, checkValidEmail } = appValidators()
    const { control, handleSubmit, register, formState: { errors }, setValue, }: any = useForm({ mode: 'onTouched' })
    const defaultData = appStore.modalDialogA.defaultData.value

    useGranularEffect(() => {
        setFormValues()
        loadRolesBuCodes()
    }, [], [loadRolesBuCodes, setFormValues])

    const registerUserName = register('userName', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
        , validate: {
            noSpecialChar: (val: string) => checkNoSpecialChar(val),
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

                {/* Role*/}
                {/* chakra-react-select is used with react-hook-form. It is uncontrolled control. Hence Controller is used */}
                <Controller
                    control={control}
                    name='role'
                    rules={{ required: Messages.errRequired }}
                    render={
                        ({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { error }
                        }) => (
                            <FormControl isInvalid={!!error} id="role">
                                <FormLabel fontWeight='bold'>Role <AppRequiredAstrisk /></FormLabel>
                                <Select
                                    size='sm'
                                    name={name}
                                    ref={ref}
                                    onChange={onChange}
                                    onBlur={onBlur}

                                    value={value || ''}
                                    options={meta.roles.value}
                                    placeholder="Select role"
                                />
                                {(!!error) ? <FormErrorMessage color='red.400' fontSize='xs'>{error.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                            </FormControl>
                        )
                    }
                />

                {/* Bu codes*/}
                {/* chakra-react-select is used with react-hook-form. It is uncontrolled control. Hence Controller is used */}
                <Controller
                    control={control}
                    name='bues'
                    rules={{ required: Messages.errRequired }}
                    render={
                        ({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { error }
                        }) => (
                            <FormControl isInvalid={!!error} id="branches">
                                <FormLabel fontWeight='bold'>Bu codes <AppRequiredAstrisk /></FormLabel>
                                <Select
                                    size='sm'
                                    name={name}
                                    ref={ref}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    isMulti={true}
                                    value={value || ''}
                                    options={meta.bues.value}
                                    placeholder="Select bu codes"
                                />
                                {(!!error) ? <FormErrorMessage color='red.400' fontSize='xs'>{error.message}</FormErrorMessage>
                                    : <>&nbsp;</>
                                }
                            </FormControl>
                        )
                    }
                />

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

    async function loadRolesBuCodes() {
        const clientId = appStore.login.clientId
        const args = {
            sqlId: 'get_all_roles_roleIds_buCodes_buIds',
            sqlArgs: {
                clientId: clientId
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        showAppLoader(true)
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows) {
                const jsonResult = rows[0]?.['jsonResult']
                const allRoles: any[] = jsonResult?.roles || []
                const allBues: any[] = jsonResult?.bues || []


                const allRolesArray: any[] = allRoles.map((item: any) => {
                    return ({ value: item.id, label: item.roleName })
                })
                meta.roles.value = [...allRolesArray]

                const allBuArray: any[] = allBues.map((item: any) => {
                    return ({ value: item.id, label: item.buCode })
                })
                meta.bues.value = [...allBuArray]

                if (!_.isEmpty(defaultData)) {
                    const roles: any[] = meta.roles.value
                    const selectedRole = roles.find((x: any) => (x.value === defaultData.roleId))
                    setValue('role', selectedRole)
                }
            }
            // Edit mode has non empty defaultData
            if (!_.isEmpty(defaultData)) {
                const roles: any[] = meta.roles.value
                const selectedRole = roles.find((x: any) => (x.value === defaultData.roleId))
                setValue('client', selectedRole)
                const bues: any[] = meta.bues.value

                const selectedBuIdsJson = defaultData.buIdsJson || []
                meta.origBuIdsJson.value = [...selectedBuIdsJson]

                const selectedBues: any[] = selectedBuIdsJson.map((it: any) => {
                    const bu = bues.find((b: any) => (b.value === it.buId))
                    bu.id = it.id
                    return (bu)
                })
                setValue('bues', selectedBues)
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
        let details: any[] = []
        const businessUnits: any[] = values.bues
        const origBuIdsJson: any[] = meta.origBuIdsJson.value
        const origIds: number[] = origBuIdsJson.flatMap((x: any) => x.id)
        const selectedIds: number[] = businessUnits.flatMap((x: any) => x.id)

        const deletedIds: number[] = []
        origIds.forEach((id: number) => {
            if (!selectedIds.includes(id)) {
                deletedIds.push(id)
            }
        })

        if (businessUnits) {
            details = businessUnits.map((bu: any) => {
                return ({
                    tableName: 'UserBuX',
                    fkeyName: 'userId',
                    deletedIds: deletedIds,
                    xData: {
                        buId: bu?.value,
                        id: bu?.id
                    }
                })
            })
        }
        const sqlObj = {
            tableName: 'UserM',
            xData: {
                id: id,
                roleId: values?.['role']?.value,
                userName: values?.['userName'],
                userEmail: values?.['userEmail'],
                mobileNo: values?.['mobileNo'],
                descr: values?.['descr'],
                isActive: values?.['isActive'],
                clientId: appStore.login.clientId,
                uid: values?.['uid'],
                xDetails: details
            }
        }
        const q = appGraphqlStrings['updateUser'](sqlObj, 'traceAuth')
        try {
            setIsSubmitDisabled(true)
            showAppLoader(true)
            const result: GraphQlQueryResultType = await mutateGraphql(q)
            handleUpdateResult(result, () => {
                closeModalDialogA()
                appStore.admin.businessUsers.doReload()
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

export { AdminEditNewBusinessUser }
