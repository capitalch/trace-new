import {
    AppRequiredAstrisk, appStore, appValidators,CustomMethodExecutionType, CustomMethodNamesEnum, GraphQlQueryResultType,
    Messages, useDialogs, useAppGraphql, useFeedback,
} from '@src/features'
import {
    _, Button, FormControl,
    FormErrorMessage, FormHelperText, FormLabel, HStack, Input, useForm, VStack, useState,
} from '@src/libs'

function PasswordChange() {
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, showAlertDialogOk, } = useDialogs()
    const { appGraphqlStrings, mutateGraphql, } = useAppGraphql()
    const { showAppLoader, showError } = useFeedback()
    const { checkNoSpaceOrSpecialChar, checkNoSpecialChar, checkNoSpace } = appValidators()
    const { handleSubmit, register, getValues, formState: { errors }, setError, setValue, }: any = useForm({ mode: 'onTouched' })
    const { checkPwd, } = appValidators()
    const defaultData = appStore.modalDialogA.defaultData.value

    const registerNewPassword = register('newPassword', {
        required: Messages.errRequired
        , validate: { checkPwd: checkPwd,}
        , minLength: { value: 8, message: Messages.errAtLeast8Chars }
    })

    const registerConfirmNewPassword = register('confirmNewPassword', {
        required: Messages.errRequired
        , validate: { checkPwd: checkPwd, noSamePwd: checkSamePwd }
        , minLength: { value: 8, message: Messages.errAtLeast8Chars }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                {/* current uid */}
                <FormControl>
                    <FormLabel fontWeight='bold'>Current uid</FormLabel>
                    <Input name='currentUid' size='sm' type='text' isDisabled={true} value={appStore.login.uid.value} />
                </FormControl>

                {/* new password */}
                <FormControl isInvalid={!!errors.newPassword}>
                    <FormLabel fontWeight='bold'>New password&nbsp;<AppRequiredAstrisk /></FormLabel>
                    <Input name='newPassword' placeholder='*****' size='sm' type='password' {...registerNewPassword} autoComplete='off' />
                    {(!!errors.newPassword) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.newPassword.message}</FormErrorMessage>
                        : <FormHelperText color='gray.400' fontSize='xs'>{Messages.messMin8Char1Digit1Special}</FormHelperText>
                    }
                </FormControl>

                {/* confirm new password */}
                <FormControl isInvalid={!!errors.confirmNewPassword}>
                    <FormLabel fontWeight='bold'>Confirm new password&nbsp;<AppRequiredAstrisk /></FormLabel>
                    <Input name='confirmNewPassword' placeholder='*****' size='sm' type='password' {...registerConfirmNewPassword} autoComplete='off' />
                    {(!!errors.confirmNewPassword) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.confirmNewPassword.message}</FormErrorMessage>
                        : <FormHelperText color='gray.400' fontSize='xs'>{Messages.messMin8Char1Digit1Special}</FormHelperText>
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

    function checkSamePwd(input: string) {
        let error = null
        const allValues = getValues()
        const newPassword = allValues['newPassword']
        const confirmNewPassword = allValues['confirmNewPassword']
        if (newPassword !== confirmNewPassword) {
            error = Messages.errPasswordsNotSame
        }
        return (error)
    }

    async function onSubmit(values: any) {
        const userId = appStore.login.userId
        const dataObj: CustomMethodExecutionType = {
            customMethodName: CustomMethodNamesEnum.change_password,
            customMethodParams: {
                userId: userId,
                password: values['newPassword']
            }
        }
        const q = appGraphqlStrings['customMethod'](dataObj, 'traceAuth')
        try {
            setIsSubmitDisabled(true)
            showAppLoader(true)
            const result: GraphQlQueryResultType = await mutateGraphql(q)
            handleUpdateResult(result, () => {
                closeModalDialogA()
                // appStore.login.uid.value = values.uid
                // appStore.superAdmin.clients.doReload()
            }, 'customMethod')
        } catch (e: any) {
            showError(Messages.errUpdatingData)
            console.log(e.message)
        } finally {
            showAppLoader(false)
            setIsSubmitDisabled(false)
        }
    }
}

export { PasswordChange }