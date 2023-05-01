import {
    AppRequiredAstrisk, appStore, appValidators, GraphQlQueryResultType, 
    Messages, useDialogs, useAppGraphql, useFeedback,
    debounceFilterOn, ebukiMessages, debounceEmit, 
} from '@src/features'
import {_,Button, FormControl,
    FormErrorMessage, FormLabel, HStack, Input,useForm, VStack, useState, useGranularEffect, NumberInput, NumberInputField,} from '@src/libs'
function SuperAdminEditNewSecuredControl() {
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, } = useDialogs()
    const { showAppLoader, showError } = useFeedback()
    const { appGraphqlStrings, handleAndGetQueryResult, mutateGraphql, queryGraphql } = useAppGraphql()
    const { checkNoSpaceOrSpecialChar, } = appValidators()
    const { handleSubmit, register, formState: { errors }, setError, setValue, }: any = useForm({ mode: 'onTouched' })
    const defaultData = appStore.modalDialogA.defaultData.value

    useGranularEffect(() => {
        setFormValues()
        const subs1 = debounceFilterOn(ebukiMessages.controlNameChangeDebounce.toString(), 1200).subscribe(
            (d: any) => {
                validateControlName(d.data, setError)
            })
        const subs2 = debounceFilterOn(ebukiMessages.controlNoChangeDebounce.toString(), 1200).subscribe(
            (d: any) => {
                validateControlNo(d.data, setError)
            })
        return (() => {
            subs1.unsubscribe()
            subs2.unsubscribe()
        })
    }, [], [validateControlName, validateControlNo, setFormValues])

    const registerControlName = register('controlName', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
        , validate: {
            noSpaceOrSpecialChar: (val: string) => checkNoSpaceOrSpecialChar(val),
            validate: (val: string) => {
                if (_.isEmpty(defaultData)) { // Allow unique controlName validation only when inserting data
                    debounceEmit(ebukiMessages.controlNameChangeDebounce.toString(), val)
                }
            }
        }
    })

    const registerControlNo = register('controlNo', {
        required: Messages.errRequired
        , validate: {
            validate: (val: string) => {
                if (_.isEmpty(defaultData)) { // Allow unique controlNo validation only when inserting data
                    debounceEmit(ebukiMessages.controlNoChangeDebounce.toString(), val)
                }
            }
        }
    })

    const registerControlType = register('controlType', {
        required: Messages.errRequired
        , validate: {
            noSpaceOrSpecialChar: (val: string) => checkNoSpaceOrSpecialChar(val),
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                {/* Control name */}
                <FormControl isInvalid={!!errors.controlName}>
                    <FormLabel fontWeight='bold'>Control name <AppRequiredAstrisk /></FormLabel>
                    <Input name='controlName' placeholder='e.g vouchers-journal' autoFocus size='sm' type='text' {...registerControlName} autoComplete='off' />
                    {(!!errors.controlName) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.controlName.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
                </FormControl>

                {/* control no */}
                <FormControl isInvalid={!!errors.controlNo}>
                    <FormLabel fontWeight='bold'>Control no <AppRequiredAstrisk /></FormLabel>
                    <NumberInput size='sm'>
                        <NumberInputField name='permission' placeholder='e.g 0,1,2 ...' {...registerControlNo} />
                    </NumberInput>
                    {(!!errors.controlNo) ? <FormErrorMessage color='red.400'>{errors.controlNo.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
                </FormControl>

                {/* Control type */}
                <FormControl isInvalid={!!errors.controlType}>
                    <FormLabel fontWeight='bold'>Control type <AppRequiredAstrisk /></FormLabel>
                    <Input name='controlType' placeholder='e.g menu, button etc.' size='sm' type='text' {...registerControlType} autoComplete='off' />
                    {(!!errors.controlType) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.controlType.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
                </FormControl>

                {/* Description */}
                <FormControl>
                    <FormLabel fontWeight='bold'>Control description</FormLabel>
                    <Input name='descr' size='sm' type='text' autoComplete='off' {...register('descr')} />
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
            tableName: 'SecuredControlM',
            xData: {
                id: id,
                controlName: values?.controlName,
                descr: values?.descr,
                controlNo: values?.controlNo || null,
                controlType: values?.controlType || null
            }
        }
        const q = appGraphqlStrings['genericUpdate'](sqlObj, 'traceAuth')
        try {
            setIsSubmitDisabled(true)
            showAppLoader(true)
            const result: GraphQlQueryResultType = await mutateGraphql(q)
            handleUpdateResult(result, () => {
                closeModalDialogA()
                appStore.superAdmin.securedControls.doReload()
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

    async function validateControlName(controlName: string, setError: any) {
        const args = {
            sqlId: 'get_super_admin_control_name',
            sqlArgs: {
                controlName: controlName.toLowerCase()
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        let ret = undefined
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows && (rows.length > 0)) {
                setError('controlName', {
                    type: '400',
                    message: Messages.errControlExists
                })
                ret = Messages.errControlExists
            }
        } catch (e: any) {
            console.log(e)
        }
        return (ret)
    }

    async function validateControlNo(controlNo: number, setError: any) {
        const args = {
            sqlId: 'get_super_admin_control_no',
            sqlArgs: {
                controlNo: controlNo
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        let ret = undefined
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows && (rows.length > 0)) {
                setError('controlNo', {
                    type: '400',
                    message: Messages.errControlNoExists
                })
                ret = Messages.errControlNoExists
            }
        } catch (e: any) {
            console.log(e)
        }
        return (ret)
    }
}

export { SuperAdminEditNewSecuredControl }