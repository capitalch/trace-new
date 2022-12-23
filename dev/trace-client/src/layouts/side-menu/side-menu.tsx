import { appStore, AppConstants, MenuAnt, } from '@src/features'
import { useSideMenu } from './side-menu-hook'

function SideMenu() {
    const { getMenuItems, handleOnOpenChange, handleOnSelect, menuItems } = useSideMenu()
    return (<MenuAnt        
        items={getMenuItems(menuItems)}
        mode='inline'
        onOpenChange={handleOnOpenChange}
        onSelect={handleOnSelect}
        openKeys={appStore.layouts.sideMenuOpenKeys.value}
        selectedKeys={appStore.layouts.sideMenuSelectedKeys.value}
        style={{ width: `${AppConstants.SIDEBAR_WIDTH}`, marginTop: 0, }}
        // theme='dark'
        >
    </MenuAnt>)
}
export { SideMenu }

// defaultOpenKeys={['sub1']}
// defaultSelectedKeys={['1']}

// const items: MenuPropsAnt['items'] = [
//     {
//         label: 'Navigation one',
//         key: 'sub1',
//         // icon: <AiFillAlert />,

//         children: [
//             {
//                 label: 'Option 1',
//                 key: '1'
//             },
//             {
//                 label: 'Option 2',
//                 key: '2'
//             },
//             {
//                 label: 'Option 3',
//                 key: '3'
//             },
//             {
//                 label: 'Option 4',
//                 key: '4'
//             }
//         ]
//     },
//     {
//         label: 'Navigation two',
//         key: 'sub2',
//         // icon: <AiFillAlipayCircle />,
//         children: [
//             {
//                 label: 'Option 1',
//                 key: '5'
//             },
//             {
//                 label: 'Option 2',
//                 key: '6'
//             },
//             {
//                 label: 'Option 3',
//                 key: '7'
//             },
//             {
//                 label: 'Option 4',
//                 key: '8'
//             }
//         ]
//     },
//     {
//         label: 'Navigation three',
//         key: 'sub3',
//         // icon: <AiFillAliwangwang />,
//         children: [
//             {
//                 label: 'Option 1',
//                 key: '9'
//             },
//             {
//                 label: 'Option 2',
//                 key: '10'
//             },
//             {
//                 label: 'Option 3',
//                 key: '11'
//             },
//             {
//                 label: 'Option 4',
//                 key: '12'
//             }
//         ]
//     },
//     {
//         label: 'Navigation four',
//         key: 'sub4',
//         // icon: <AiFillAliwangwang />,
//         children: [
//             {
//                 label: 'Option 1',
//                 key: '13'
//             },
//             {
//                 label: 'Option 2',
//                 key: '14'
//             },
//             {
//                 label: 'Option 3',
//                 key: '15'
//             },
//             {
//                 label: 'Option 4',
//                 key: '16'
//             }
//         ]
//     }
// ]

// interface MenuItemType {
//     label: string
//     component?: React.FC
//     icon?: any
//     children?: MenuItemType[]
// }

// const items1: MenuItemType[] = [
//     {
//         label: 'Vouchers',
//         icon: <VouchersIcon />,
//         children: [
//             {
//                 label: 'Journals',
//                 component: AppJournals
//             },
//             {
//                 label: 'Payments',
//                 component: AppPayments
//             }
//         ],
//     },
//     {
//         label: 'Sales / purchases',
//         icon: <SalesPurchaseIcon />,
//         children: [
//             {
//                 label: 'Sales',
//                 component: AppSales
//             }
//         ]
//     }
// ]