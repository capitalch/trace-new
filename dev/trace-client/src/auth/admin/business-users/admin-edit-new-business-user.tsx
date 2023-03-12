import {
    _, AppRequiredAstrisk, appStore, appValidators, Button, Checkbox, FormControl,
    FormErrorMessage, FormLabel, GraphQlQueryResultType, HStack, Input,
    Messages, useDeepSignal, useDialogs, useAppGraphql, useFeedback,
    useForm, VStack, appStaticStore, useState, useGranularEffect, NumberInput, NumberInputField, Box,
} from '@src/features'

import { Select } from 'chakra-react-select'
import { Controller } from 'react-hook-form'

function AdminEditNewBusinessUser() {
    return (<Box>Business users</Box>)
}

export { AdminEditNewBusinessUser }