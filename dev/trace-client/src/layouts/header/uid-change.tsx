import {
    AppRequiredAstrisk, appStore, appValidators, EventTriggersEnum, GraphQlQueryResultType, Messages, useDialogs, useAppGraphql, useFeedback, SqlObjectType,
} from '@src/features'
import {
    _, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, useForm, VStack, useState,
} from '@src/libs'

function UidChange() {
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, } = useDialogs()
    const { appGraphqlStrings, mutateGraphql, } = useAppGraphql()
    const { showAppLoader, showError } = useFeedback()
    const { checkNoSpace } = appValidators()
    const { handleSubmit, register, formState: { errors }, }: any = useForm({ mode: 'onTouched' })

    const registerUid = register('uid', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast6Chars }
        , validate: {
            noSpaceAllowed: (val: string) => checkNoSpace(val),
            noSameUidAllowed: (val: string) => checkSameUid(val)
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                {/* old uid */}
                <FormControl>
                    <FormLabel fontWeight='bold'>Current uid</FormLabel>
                    <Input name='currentUid' size='sm' type='text' isDisabled={true} value={appStore.login.uid.value} />
                </FormControl>

                {/* new uid */}
                <FormControl isInvalid={!!errors.uid}>
                    <FormLabel fontWeight='bold'>New uid <AppRequiredAstrisk /></FormLabel>
                    <Input name='uid' placeholder='e.g patikKumar' size='sm' type='text' {...registerUid} autoComplete='off' />
                    {(!!errors.uid) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.uid.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
                </FormControl>

                <HStack justifyContent='flex-end' w='100%'>
                    <Button w='100%' colorScheme='blue' type='submit' isDisabled={(!_.isEmpty(errors) || isSubmitDisabled)} >
                        Submit
                    </Button>
                </HStack>
            </VStack>
        </form>
    )

    function checkSameUid(input: string) {
        let error = null
        const oldUid = appStore.login.uid.value.toLowerCase().trim()
        const newUid = (input || '').toLowerCase().trim()
        if (oldUid === newUid) {
            error = Messages.errUidValuesSame
        }
        return (error)
    }

    async function onSubmit(values: any) {
        const id = appStore.login.userId
        const sqlObj: SqlObjectType = {
            tableName: 'UserM',
            xData: {
                id: id,
                uid: values.uid,
            },
            onSuccessTriggerName: EventTriggersEnum.on_success_change_uid,
            onSuccessTriggerParams: { email: appStore.login.email.value, uid: appStore.login.uid.value }
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
}

export { UidChange }