import {
    _, AppRequiredAstrisk, appStore, appValidators, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, GraphQlQueryResultType, HStack, Input,
    Messages, useDialogs, useAppGraphql, useFeedback,
    useForm, VStack, appStaticStore, useState, debounceFilterOn, ebukiMessages, debounceEmit, useGranularEffect, NumberInput, NumberInputField,
} from '@src/features'

function SuperAdminEditNewSecuredControl(){
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, showAlertDialogOk, } = useDialogs()
    const { showAppLoader, showError } = useFeedback()
    const { appGraphqlStrings, handleAndGetQueryResult,mutateGraphql,  queryGraphql} = useAppGraphql()
    const { checkNoSpaceOrSpecialChar, checkNoSpecialChar } = appValidators()
    const { handleSubmit, register, formState: { errors }, setError, setValue, }: any = useForm({ mode: 'onTouched' })
    // const { validateClientCode } = useSuperAdminClientsCommon()
    const defaultData = appStore.modalDialogA.defaultData.value

    const registerControlName = register('controlName', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
        , validate: {
            noSpaceOrSpecialChar: (val: string) => checkNoSpaceOrSpecialChar(val),
            validate: (val: string) => {
                // if (_.isEmpty(defaultData)) { // Allow unique clientCode validation only when inserting data
                //     debounceEmit(ebukiMessages.roleNameChangeDebounce.toString(), val)
                // }
            }
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
                {/* Role name */}
                <FormControl isInvalid={!!errors.controlName}>
                    <FormLabel fontWeight='bold'>Control name <AppRequiredAstrisk /></FormLabel>
                    <Input name='roleName' placeholder='e.g vouchers-journal' autoFocus size='sm' type='text' {...registerControlName} autoComplete='off' />
                    <HStack justifyContent='space-between' alignItems='center'>
                        {(!!errors.roleName) ? <FormErrorMessage color='red.400' mt={0} fontSize='xs'>{errors.controlName.message}</FormErrorMessage>
                            : <>&nbsp;</>
                        }
                        {/* <Button tabIndex={-1} size='xs' variant='unstyled' colorScheme='blue' onClick={handleRoleNameInfo}>Info</Button> */}
                    </HStack>
                </FormControl>

                {/* Description */}
                <FormControl>
                    <FormLabel fontWeight='bold'>Role description</FormLabel>
                    <Input name='descr' size='sm' type='text' autoComplete='off' {...register('descr')} />
                </FormControl>

                {/* Permission */}
                <FormControl>
                    <FormLabel fontWeight='bold'>Permission</FormLabel>
                    <NumberInput size='sm'>
                        <NumberInputField name='permission' placeholder='e.g 0,1,2 ...' {...register('permission')} />
                    </NumberInput>
                </FormControl>

                <HStack w='100%'>
                    <Button mt={5} w='100%' colorScheme='blue' type='submit' isDisabled={(!_.isEmpty(errors) || isSubmitDisabled)} >
                        Submit
                    </Button>
                </HStack>
            </VStack>
        </form>
    )

    async function onSubmit(values: any) {
        const id = values?.id
        const sqlObj = {
            tableName: 'RoleM',
            xData: {
                id: id,
                roleName: values?.roleName,
                descr: values?.descr,
                permission: values?.permission || null
            }
        }
        const q = appGraphqlStrings['genericUpdate'](sqlObj, 'traceAuth')
        try {
            setIsSubmitDisabled(true)
            showAppLoader(true)
            const result: GraphQlQueryResultType = await mutateGraphql(q)
            handleUpdateResult(result, () => {
                closeModalDialogA()
                appStaticStore.superAdmin.roles.doReload()
            }, 'genericUpdate')
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

export {SuperAdminEditNewSecuredControl}