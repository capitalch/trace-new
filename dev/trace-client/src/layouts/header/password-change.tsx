import {
    AppCheckbox, AppRequiredAstrisk, appStore, appValidators, GraphQlQueryResultType,
    Messages, useDialogs, useAppGraphql, useFeedback,
    debounceFilterOn, ebukiMessages, debounceEmit,
} from '@src/features'
import {
    _, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, HStack, Input, useForm, VStack, useState, useGranularEffect,
} from '@src/libs'

function PasswordChange(){
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
        , validate: { checkPwd }
        , minLength: { value: 8, message: Messages.errAtLeast8Chars }
    })

    const registerConfirmNewPassword = register('confirmNewPassword', {
        required: Messages.errRequired
        , validate: { checkPwd }
        , minLength: { value: 8, message: Messages.errAtLeast8Chars }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                <FormControl>
                    <FormLabel fontWeight='bold'>Current uid</FormLabel>
                    <Input name='currentUid' size='sm' type='text' isDisabled={true}/>
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight='bold'>New password<AppRequiredAstrisk /></FormLabel>
                    <Input name='newPassword' placeholder='*****' size='sm' type='password' {...registerNewPassword} autoComplete='off' />
                    <HStack justifyContent='space-between' >
                        {(!!errors.newPassword) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.newPassword.message}</FormErrorMessage>
                            : <>&nbsp;</>
                        }
                    </HStack>
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight='bold'>Confirm new password<AppRequiredAstrisk /></FormLabel>
                    <Input name='confirmNewPassword' placeholder='*****' size='sm' type='password' {...registerConfirmNewPassword} autoComplete='off' />
                    <HStack justifyContent='space-between' >
                        {(!!errors.confirmNewPassword) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.confirmNewPassword.message}</FormErrorMessage>
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

    async function onSubmit(values: any){

    }
}

export {PasswordChange}