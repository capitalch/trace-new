import {
    _, AppRequiredAstrisk, appStore, appValidators, Button, FormControl,
    FormErrorMessage, FormLabel, GraphQlQueryResultType, HStack, Input,
    Messages, useDialogs, useAppGraphql, useFeedback,
    useForm, VStack, appStaticStore, useState, debounceFilterOn, ebukiMessages, debounceEmit, useGranularEffect, NumberInput, NumberInputField,
} from '@src/features'

function SuperAdminEditNewRole() {
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, } = useDialogs()
    const { showAppLoader, showError } = useFeedback()
    const { appGraphqlStrings, handleAndGetQueryResult, mutateGraphql, queryGraphql } = useAppGraphql()
    const { checkNoSpaceOrSpecialChar,  } = appValidators()
    const { handleSubmit, register, formState: { errors }, setError, setValue, }: any = useForm({ mode: 'onTouched' })

    const defaultData = appStore.modalDialogA.defaultData.value

    useGranularEffect(() => {
        setFormValues()
        const subs1 = debounceFilterOn(ebukiMessages.roleNameChangeDebounce.toString(), 1200).subscribe(
            (d: any) => {
                validateRoleName(d.data, setError)
            })
        return (() => {
            subs1.unsubscribe()
        })
    }, [], [validateRoleName, setFormValues])

    const registerRoleName = register('roleName', {
        required: Messages.errRequired
        , minLength: { value: 3, message: Messages.errAtLeast3Chars }
        , validate: {
            noSpaceOrSpecialChar: (val: string) => checkNoSpaceOrSpecialChar(val),
            validate: (val: string) => {
                if (_.isEmpty(defaultData)) { // Allow unique roleName validation only when inserting data
                    debounceEmit(ebukiMessages.roleNameChangeDebounce.toString(), val)
                }
            }
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                
                {/* Role name */}
                <FormControl isInvalid={!!errors.roleName}>
                    <FormLabel fontWeight='bold'>Role name <AppRequiredAstrisk /></FormLabel>
                    <Input name='roleName' placeholder='e.g manager' autoFocus size='sm' type='text' {...registerRoleName} autoComplete='off' />
                    {(!!errors.roleName) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.roleName.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
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

    async function validateRoleName(roleName: string, setError: any) {
        const args = {
            sqlId: 'get_super_admin_role_name',
            sqlArgs: {
                roleName: roleName.toLowerCase()
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        let ret = undefined
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows && (rows.length > 0)) {
                setError('roleName', {
                    type: '400',
                    message: Messages.errRoleNameExists
                })
                ret = Messages.errRoleNameExists
            }
        } catch (e: any) {
            console.log(e)
        }
        return (ret)
    }
}
export { SuperAdminEditNewRole }