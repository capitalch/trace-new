import {
    _, appGraphqlStrings, appValidators, Box, Button, Center, Checkbox, FormControl,
    FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input,
    Messages, Text, useDeepSignal, useAppGraphql, VStack, appStore,
} from '@src/features'
import axios from 'axios'
import { useForm } from 'react-hook-form'

function SuperAdminNewClient() {
    const { mutateGraphql, queryGraphql } = useAppGraphql()
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
                    <HStack justifyContent='space-between' alignItems='center'>
                        {(!!errors.clientCode) ? <FormErrorMessage color='red.400' mt={0} fontSize='xs'>{errors.clientCode.message}</FormErrorMessage>
                            : <>&nbsp;</> // <FormHelperText fontSize='xs' color='gray.400'>{Messages.messNoSpecialSpace4Plus}</FormHelperText>
                        }
                        <Button size='xs' variant='ghost' colorScheme='blue' onClick={handleClientCodeInfo}>Info</Button>
                    </HStack>
                </FormControl>

                <FormControl isInvalid={!!errors.clientName}>
                    <FormLabel>Client name</FormLabel>
                    <Input id='clientName' size='sm' type='text' {...registerClientName} autoComplete='off' />
                    <HStack justifyContent='space-between' >
                        {(!!errors.clientName) ? <FormErrorMessage mt={0} color='red.400' fontSize='xs'>{errors.clientName.message}</FormErrorMessage>
                            : <>&nbsp;</> //<FormHelperText fontSize='xs' color='gray.400'>{Messages.messNoSpecial4Plus}</FormHelperText>
                        }
                        <Button size='xs' variant='ghost' colorScheme='blue' onClick={handleClientNameInfo}>Info</Button>
                    </HStack>
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

    function handleClientCodeInfo() {
        appStore.alertOk.header.value = 'Information'
        appStore.alertOk.body.value = <Box fontSize='lg' color='gray.900'>{Messages.messNoSpecialSpace4Plus}</Box>
        appStore.alertOk.isOpen.value = true
    }

    function handleClientNameInfo() {
        appStore.alertOk.header.value = 'Information'
        appStore.alertOk.body.value = <Box fontSize='lg' color='gray.900'>{Messages.messNoSpecial4Plus}</Box>
        appStore.alertOk.isOpen.value = true
    }

    async function onSubmit(values: any) {
        // const ret1 = await axios.post('http://localhost:8000/api/')
        // console.log(ret1)
        const sqlObj = {
            tableName: 'TestM',
            xData: {
                ...values,
                dbName: `${values.clientCode}_accounts`,
                // xDetails: [
                //     {
                //         tableName: 'TestD',
                //         fkeyName: 'clientId',
                //         xData: {
                //             userName: 'Test details user name',
                //             descr: 'Test details user descr',
                //             // wrong: 'wrong'
                //         }
                //     },
                //     {
                //         tableName: 'TestD',
                //         fkeyName: 'clientId',
                //         xData: {
                //             userName: 'Test details user name1',
                //             descr: 'Test details user descr1',
                //             // wrong: 'wrong'
                //         }
                //     },
                //     {
                //         tableName: 'TestD',
                //         fkeyName: 'clientId',
                //         xData: {
                //             userName: 'Test details user name2',
                //             descr: 'Test details user descr2',
                //             // wrong: 'wrong'
                //         }
                //     }

                // ]
            }
        }

        const q = appGraphqlStrings['genericUpdate'](sqlObj, 'traceAuth')
        const st = new Date().getTime()
        const ret = await mutateGraphql(q)
        const en = (new Date()).getTime()
        console.log(en - st, ret)
        // console.log(ret)
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