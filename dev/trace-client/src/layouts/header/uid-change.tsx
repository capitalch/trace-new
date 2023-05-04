import {
    AppCheckbox, AppRequiredAstrisk, appStore, appValidators, GraphQlQueryResultType,
    Messages, useDialogs, useAppGraphql, useFeedback,
    debounceFilterOn, ebukiMessages, debounceEmit, SqlObjectType,
} from '@src/features'
import {
    _, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, HStack, Input, useForm, VStack, useState, useGranularEffect,
} from '@src/libs'

function UidChange() {
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, showAlertDialogOk, } = useDialogs()
    const { appGraphqlStrings, mutateGraphql, } = useAppGraphql()
    const { showAppLoader, showError } = useFeedback()
    const { checkNoSpaceOrSpecialChar, checkNoSpecialChar, checkNoSpace } = appValidators()
    const { handleSubmit, register, getValues, formState: { errors }, setError, setValue, }: any = useForm({ mode: 'onTouched' })

    const defaultData = appStore.modalDialogA.defaultData.value

    const registerUid = register('uid', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast6Chars }
        , validate: {
            noSpaceAllowed: (val: string) => checkNoSpace(val),
            // validate: (val: string) => {
            //     if (_.isEmpty(defaultData)) { // Allow unique clientCode validation only when inserting data
            //         debounceEmit(ebukiMessages.clientCodeChangeDebounce.toString(), val)
            //     }
            // }
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                <FormControl>
                    <FormLabel fontWeight='bold'>Current uid</FormLabel>
                    <Input name='currentUid' size='sm' type='text' isDisabled={true} value={appStore.login.uid.value} />
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight='bold'>New uid <AppRequiredAstrisk /></FormLabel>
                    <Input name='uid' placeholder='e.g patikKumar' size='sm' type='text' {...registerUid} autoComplete='off' />
                    <HStack justifyContent='space-between' >
                        {(!!errors.uid) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.uid.message}</FormErrorMessage>
                            : <>&nbsp;</>
                        }
                    </HStack>
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
        const id = appStore.login.userId
        const sqlObj: SqlObjectType = {
            tableName: 'UserM',
            xData: {
                id: id,
                uid: values.uid,
            }
        }
        const q = appGraphqlStrings['genericUpdate'](sqlObj, 'traceAuth')
        try {
            setIsSubmitDisabled(true)
            showAppLoader(true)
            const result: GraphQlQueryResultType = await mutateGraphql(q)
            handleUpdateResult(result, () => {
                closeModalDialogA()
                appStore.login.uid.value = values.uid
                // appStore.superAdmin.clients.doReload()
            }, 'updateClient')
        } catch (e: any) {
            showError(Messages.errUpdatingData)
            console.log(e.message)
        } finally {
            showAppLoader(false)
            setIsSubmitDisabled(false)
        }
    }

    // function setFormValues() {
    //     if (_.isEmpty(defaultData)) {
    //         return
    //     }
    //     for (const key in defaultData) {
    //         setValue(key, defaultData[key])
    //     }
    // }
}

export { UidChange }