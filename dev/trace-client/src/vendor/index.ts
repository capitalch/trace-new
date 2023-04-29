import _ from 'lodash'
import axios from 'axios'
import qs from 'qs'
import React from 'react'
import moment from 'moment'
import urlJoin from 'url-join'
import ReactSelect from 'react-select'
export { _, axios, qs, React, moment, urlJoin, ReactSelect, }

export {
    type FC,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from 'react'

export { produce } from 'immer'
export { Menu as MenuAnt, type MenuProps as MenuPropsAnt } from 'antd'
export { AgGridReact, type AgGridReactProps } from 'ag-grid-react'
export {
    type ColDef,
    GridApi,
    type GridOptions,
    type GridReadyEvent,
    type RowDataUpdatedEvent
} from 'ag-grid-community'
export { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact'
export { useGranularEffect } from 'granular-hooks'
export { useForm } from 'react-hook-form'
export { Else, Fallback, If, Then } from 'react-if'

export {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Checkbox,
    ChakraProvider,
    CloseButton,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    HStack,
    Icon,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    InputLeftElement,
    InputRightElement,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberInput,
    NumberInputField,
    Select,
    SimpleGrid,
    Slide,
    Spinner,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Text,
    Tooltip,
    useToast,
    theme,
    useDisclosure,
    useMediaQuery,
    VStack
} from '@chakra-ui/react'

//icons

// chakra-ui icons
export {
    ArrowLeftIcon as ArrowLeftIconChakra,
    ChevronDownIcon,
    CloseIcon as CloseIconBig,
    DeleteIcon,
    DownloadIcon,
    EditIcon,
    RepeatIcon as RefreshIcon,
    Search2Icon as SearchIcon
} from '@chakra-ui/icons'

//typicons

// Material design icons
export {
    MdContacts as ClientsIcon,
    MdHideSource as HideIcon,
    MdOutlineFactCheck as AccountsIcon,
    MdAddBusiness as BuIcon,
    MdAdminPanelSettings as AdminMenuIcon,
    MdPassword as ChangePasswordIcon,
    MdOutlineChangeCircle as ChangeUidIcon,
    MdOutlineClose as CloseIcon,
    MdLogout as LogoutIcon,
    MdMenu as MenuIcon,
    MdOutlinePersonPin as UsersIcon
} from 'react-icons/md'

// Bootstrap icons
export {
    BsFillMenuButtonWideFill as SalesPurchaseIcon,
    BsPersonFill as PersonIcon,
    BsReceipt as VouchersIcon,
    BsReverseLayoutTextWindowReverse as RolesIcon
} from 'react-icons/bs'

// Box icons
export {
    BiBarChartAlt2 as DashboardIcon,
    BiCamera as ActionsIcon,
    BiHome as HomeIcon
} from 'react-icons/bi'

//Vs code
export { VscSettingsGear as SecuredControlsIcon } from 'react-icons/vsc'