import _ from 'lodash'
import produce from 'immer'
import React from 'react'
import urlJoin from 'url-join'
export { Menu as MenuAnt, type MenuProps as MenuPropsAnt } from 'antd'
export * from './app-constants'
export * from './app-store'
export { appValidators } from './app-validators'
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
  Slide,
  Spinner,
  Text,
  Tooltip,
  useToast,
  theme,
  useDisclosure,
  useMediaQuery,
  VStack
} from '@chakra-ui/react'
export { deepSignal, useDeepSignal } from '@deepsignal/react'
export { Messages } from './messages'
export { _, produce, React, urlJoin }
export { type FC, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

export { useForm } from 'react-hook-form'
export { Else, Fallback, If, Then } from 'react-if'
export {
  type GraphQlQueryResultType,
  SideMenuTypesEnum,
  UserTypesEnum
} from './app-types'
// export { AppModalA, useAppModalA } from './components/app-modal-a'
export {
  emit,
  ebukiMessages,
  filterOn,
  hotEmit,
  hotFilterOn,
  debounceEmit,
  debounceFilterOn
} from './ibuki'
export { useAppGraphql } from './graphql/app-graphql-hook'
export { encodeObj, appGraphqlStrings } from './graphql/app-graphql-strings'
export {
  useAgGridUtils,
  useComponentHistory,
  useDialogs,
  useFeedback,
} from './utils'
export { AppLoader } from './components/app-loader'
export { AgGridReact, type AgGridReactProps } from 'ag-grid-react'
export { type ColDef, GridApi, type GridOptions, type GridReadyEvent, type RowDataUpdatedEvent } from 'ag-grid-community'
export { AgGridReact as AgGridReactType } from 'ag-grid-react/lib/agGridReact'
export { useGranularEffect } from 'granular-hooks'
export { AppAlertDialogOk } from './components/app-alert-dialog-ok'
export { AppAlertDialogYesNo } from './components/app-alert-dialog-yes-no'
export { AppModalDialogA } from './components/app-modal-dialog-a'
export { AppRequiredAstrisk } from './components/app-required-astrisk'
export { AppGridSearchBox } from './components/app-grid-search-box'
export { AppGridToolbar } from './components/app-grid-toolbar'
//icons

// chakra-ui icons
export {
  ArrowLeftIcon as ArrowLeftIconChakra,
  ChevronDownIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  RepeatIcon as RefreshIcon,
  Search2Icon as SearchIcon
} from '@chakra-ui/icons'

//typicons
// export { TiThMenu as MenuIcon, } from 'react-icons/ti'

// Material design icons
export {
  MdContacts as ClientsIcon,
  MdOutlineFactCheck as AccountsIcon,
  MdAdminPanelSettings as AdminMenuIcon,
  MdPassword as ChangePasswordIcon,
  MdOutlineChangeCircle as ChangeUidIcon,
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
export {
  VscSettingsGear as SecuredControlsIcon
} from 'react-icons/vsc'
