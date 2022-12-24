import _ from 'lodash'
import React from 'react'
export { Menu as MenuAnt, type MenuProps as MenuPropsAnt } from 'antd'
export * from './app-constants'
export * from './app-store'

export {
    Box, Button, ChakraProvider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent
    , DrawerFooter, DrawerHeader, Flex, FormControl, FormLabel, Heading, HStack, Icon, IconButton
    , Image, Input, Slide, theme, useMediaQuery, VStack
} from '@chakra-ui/react'
export { deepSignal } from '@deepsignal/react'
export { _, React }
export { useEffect, useState } from 'react'

// export {VscMenu as MenuIcon} from 'react-icons/vsc'

export { Else, Fallback, If, Then, } from 'react-if'

//icons
export { ArrowLeftIcon as ArrowLeftIconChakra, } from '@chakra-ui/icons'
export { TiThMenu as MenuIcon, } from 'react-icons/ti'
// export { BsCardList as VouchersIcon } from 'react-icons/bs'
export { BsFillMenuButtonWideFill as SalesPurchaseIcon, BsReceipt as VouchersIcon } from 'react-icons/bs'
export { BiHome as HomeIcon } from 'react-icons/bi'

