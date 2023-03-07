import {
    _, AppRequiredAstrisk, appStore, appValidators, Button, FormControl,
    FormErrorMessage, FormLabel, GraphQlQueryResultType, HStack, Input,
    Messages, useDialogs, useAppGraphql, useFeedback,
    useForm, VStack, appStaticStore, useState, debounceFilterOn, ebukiMessages, debounceEmit, useGranularEffect, NumberInput, NumberInputField, Checkbox,
} from '@src/features'

function AdminEditNewBusinessUnit() {
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, } = useDialogs()
    const { showAppLoader, showError } = useFeedback()
    const { appGraphqlStrings, handleAndGetQueryResult, mutateGraphql, queryGraphql } = useAppGraphql()
    const { checkNoSpaceOrSpecialChar, checkNoSpecialChar } = appValidators()
    const { handleSubmit, register, formState: { errors }, setError, setValue, }: any = useForm({ mode: 'onTouched' })

    const defaultData = appStore.modalDialogA.defaultData.value

    useGranularEffect(() => {
        setFormValues()

    }, [], [setFormValues])

    const registerBuCode = register('buCode', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
        , validate: {
            noSpaceOrSpecialChar: (val: string) => checkNoSpaceOrSpecialChar(val),
            // validate: (val: string) => {
            //     if (_.isEmpty(defaultData)) { // Allow unique roleName validation only when inserting data
            //         debounceEmit(ebukiMessages.roleNameChangeDebounce.toString(), val)
            //     }
            // }
        }
    })

    const registerBuName = register('buName', {
        required: Messages.errRequired
        , minLength: { value: 8, message: Messages.errAtLeast8Chars }
        , validate: {
            noSpecialChar: (val: string) => checkNoSpecialChar(val),
            // validate: (val: string) => {
            //     if (_.isEmpty(defaultData)) { // Allow unique roleName validation only when inserting data
            //         debounceEmit(ebukiMessages.roleNameChangeDebounce.toString(), val)
            //     }
            // }
        }
    })


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                {/* Bu code */}
                <FormControl isInvalid={!!errors.buCode}>
                    <FormLabel fontWeight='bold'>Business unit code <AppRequiredAstrisk /></FormLabel>
                    <Input name='buCode' placeholder='e.g navTechnology' autoFocus size='sm' type='text' {...registerBuCode} autoComplete='off' />
                    {(!!errors.buCode) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.buCode.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
                </FormControl>

                {/* Bu name*/}
                <FormControl isInvalid={!!errors.buName}>
                    <FormLabel fontWeight='bold'>Business unit name <AppRequiredAstrisk /></FormLabel>
                    <Input name='buName' placeholder='e.g Nav Technology Pvt Ltd' size='sm' type='text' {...registerBuName} autoComplete='off' />
                    {(!!errors.buName) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.buName.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
                </FormControl>

                {/* is active */}
                <FormControl>
                    <Checkbox name='isActive' size='lg' {...register('isActive')}>Is this business unit active?</Checkbox>
                </FormControl>

                <HStack justifyContent='flex-end' w='100%'>
                    <Button w='100%' colorScheme='blue' type='submit' isDisabled={(!_.isEmpty(errors) || isSubmitDisabled)} >
                        Submit
                    </Button>
                </HStack>

            </VStack>
        </form>
    )

    async function onSubmit(values: any) {
        const id = values?.id
        const sqlObj = {
            tableName: 'BuM',
            xData: {
                id: id,
                clientId: appStaticStore.login.clientId,
                buCode: values?.buCode,
                buName: values?.buName,
                isActive: values?.isActive
            }
        }
        const q = appGraphqlStrings['genericUpdate'](sqlObj, 'traceAuth')
        try {
            setIsSubmitDisabled(true)
            showAppLoader(true)
            const result: GraphQlQueryResultType = await mutateGraphql(q)
            handleUpdateResult(result, () => {
                closeModalDialogA()
                appStaticStore.admin.businessUnits.doReload()
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

export { AdminEditNewBusinessUnit }