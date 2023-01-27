import {
    _, appGraphqlStrings, appValidators, Box, Button, Center, Checkbox, FormControl,
    FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input,
    Messages, Text, useDeepSignal, useAppGraphql, VStack,
} from '@src/features'
import { useForm } from 'react-hook-form'
import axios from 'axios'

function SuperAdminNewClient() {
    const { mutateGraphql, } = useAppGraphql()
    // const meta = useDeepSignal({
    //     clientCode: ''
    // })
    // const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))
    const { checkNoSpaceOrSpecialChar } = appValidators()
    const { getValues, handleSubmit, register, formState: { errors }, setValue, watch }: any = useForm<SuperAdminClientType>({ mode: 'onTouched' })
    const registerClientCode = register('clientCode', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
        , validate: {
            noSpaceOrSpecialChar: (val: string) => checkNoSpaceOrSpecialChar(val),
            // asyncValid: async (val:string)=> {
            //     await sleep(1000)
            //     return 'async validation'
            // }
        }
    })
    const registerClientName = register('clientName', {
        required: Messages.errRequired
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4}>
                <FormControl isInvalid={!!errors.clientCode}>
                    <FormLabel>Client code</FormLabel>
                    <Input id='clientCode' autoFocus size='sm' type='text' {...registerClientCode} autoComplete='off' />
                    {(!!errors.clientCode) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.clientCode.message}</FormErrorMessage>
                        : <FormHelperText fontSize='xs' color='gray.400'>{Messages.messNoSpecialSpace4Plus}</FormHelperText>
                    }
                </FormControl>

                <FormControl isInvalid={!!errors.clientName}>
                    <FormLabel>Client name</FormLabel>
                    <Input id='clientName' size='sm' type='text' {...registerClientName} autoComplete='off' />
                    {(!!errors.clientName) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.clientName.message}</FormErrorMessage>
                        : <FormHelperText fontSize='xs' color='gray.400'>{Messages.messNoSpecial4Plus}</FormHelperText>
                    }
                </FormControl>

                <FormControl>
                    <Checkbox id='isActive' size='lg' {...register('isActive')}>Is this client active?</Checkbox>
                </FormControl>

                <HStack justifyContent='flex-end' w='100%'>
                    <Button w='100%' colorScheme='blue' type='submit' disabled={!_.isEmpty(errors)} >
                        Submit
                    </Button>
                </HStack>
            </VStack>
        </form>
    )
    async function onSubmit(values: any) {
        // const ret1 = await axios.get('http://localhost:8000/api/')
        // console.log(ret1)
        const q = appGraphqlStrings['genericUpdate'](values, 'traceAuth')
        const ret = await mutateGraphql(q)
        console.log(ret)
        // for(let i = 0;i<1000;i++){
        //     const ret = await mutateGraphql(q)
        //     console.log(ret)
        // }


    }
}
export { SuperAdminNewClient }

type SuperAdminClientType = {
    clientCode: string
    clientName: string
    isActive: boolean
}