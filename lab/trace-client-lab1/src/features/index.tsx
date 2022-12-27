import _ from 'lodash'
import produce from 'immer'
import React from 'react'
export { Menu as MenuAnt, type MenuProps as MenuPropsAnt } from 'antd'
export * from './app-constants'
export * from './app-store'
export { appValidators } from './app-validators'
export {
    Box, Button, Center, ChakraProvider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent
    , DrawerFooter, DrawerHeader, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Icon, IconButton
    , Image, Input, Menu, MenuButton, MenuList, MenuItem, Slide, Text, theme, useMediaQuery, VStack
} from '@chakra-ui/react'
export { deepSignal, useDeepSignal } from '@deepsignal/react'
export { Messages } from './messages'
export { _, produce, React }
export { useEffect, useLayoutEffect, useState } from 'react'

export { useForm } from 'react-hook-form'
export { Else, Fallback, If, Then, } from 'react-if'
export { SideMenuTypesEnum, UserTypesEnum } from './app-types'

//icons
// chakra-ui icons
export { ArrowLeftIcon as ArrowLeftIconChakra, ChevronDownIcon } from '@chakra-ui/icons'

//typicons
// export { TiThMenu as MenuIcon, } from 'react-icons/ti'

// Material design icons
export { MdMenu as MenuIcon } from 'react-icons/md'

// Bootstrap icons
export { BsFillMenuButtonWideFill as SalesPurchaseIcon, BsPersonFill as PersonIcon, BsReceipt as VouchersIcon, } from 'react-icons/bs'

// Box icons
export { BiHome as HomeIcon } from 'react-icons/bi'

