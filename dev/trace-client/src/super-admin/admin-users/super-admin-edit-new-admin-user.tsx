import {
    _, AppRequiredAstrisk, appStore, appValidators, Box, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, GraphQlQueryResultType, HStack, Input,
    Messages, useDialogs, useAppGraphql, useFeedback,
    useForm, VStack, appStaticStore, useState, debounceFilterOn, ebukiMessages, debounceEmit, useGranularEffect, NumberInput, NumberInputField,
} from '@src/features'

function SuperAdminEditNewAdminUser(){
    const { handleUpdateResult, } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const { closeModalDialogA, } = useDialogs()
    const { showAppLoader, showError } = useFeedback()
    const { appGraphqlStrings, handleAndGetQueryResult, mutateGraphql, queryGraphql } = useAppGraphql()
    const { checkNoSpaceOrSpecialChar,  } = appValidators()
    const { handleSubmit, register, formState: { errors }, setError, setValue, }: any = useForm({ mode: 'onTouched' })

    const defaultData = appStore.modalDialogA.defaultData.value

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
                {/* Role name */}
                <FormControl isInvalid={!!errors.roleName}>
                    <FormLabel fontWeight='bold'>Role name <AppRequiredAstrisk /></FormLabel>
                    {/* <Input name='roleName' placeholder='e.g manager' autoFocus size='sm' type='text' {...registerRoleName} autoComplete='off' /> */}
                    {/* <HStack justifyContent='space-between' alignItems='center'> */}
                    {(!!errors.roleName) ? <FormErrorMessage color='red.400' mt={2} fontSize='xs'>{errors.roleName.message}</FormErrorMessage>
                        : <>&nbsp;</>
                    }
                    {/* <Box>&nbsp;</Box> */}
                    {/* <Button tabIndex={-1} size='xs' variant='unstyled' colorScheme='blue' >Info</Button> */}
                    {/* </HStack> */}
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

    function onSubmit(){

    }
}

export {SuperAdminEditNewAdminUser}