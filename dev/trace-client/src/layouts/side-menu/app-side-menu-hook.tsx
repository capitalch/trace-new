import {
  BuIcon,
  ClientsIcon,
  DashboardIcon,
  HomeIcon,
  React,
  RolesIcon,
  SalesPurchaseIcon,
  SecuredControlsIcon,
  State,
  useHookstate,
  UsersIcon,
  VouchersIcon,
} from "@src/libs";
import { appStore, AppStoreType, ComponentNamesEnum, SideMenuTypesEnum } from '@src/features'
import {
  AppDashboard,
  AppJournals,
  AppPayments,
  AppSales,
  SuperAdminDashboard
} from "@src/components";
// import { SuperAdminAdminUsers, SuperAdminClients, SuperAdminDashboard, SuperAdminSecuredControls } from "@src/auth/super-admin";
// import { AdminBusinessUnits, AdminDashboard } from "@src/auth/admin";
// import { AppRoles } from "@src/auth/roles/app-roles";
// import { AdminBusinessUsers } from "@src/auth/admin/business-users/admin-business-users";

function useAppSideMenu() {
  const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
  const sideMenuType = store.layouts.sideMenuType.value;
  let num: number = 1; // For counter
  // const componentsMap: { [key: string]: React.FC } = {};
  const componentsMap: { [key: string]: any } = {};
  const breadcrumbMap: { [key: string]: any } = {}

  function getItems() {
    if (sideMenuType === SideMenuTypesEnum.accountsMenu) {
      return getMenuItems(accountsMenu);
    } else if (sideMenuType === SideMenuTypesEnum.superAdminMenu) {
      return getMenuItems(superAdminMenu);
    } else {
      return getMenuItems(adminMenu);
    }
  }

  function getMenuItems(items: MenuItemType[]): any[] {
    const menuItemsWithKeys: MenuItemType[] = items.map(
      (item: MenuItemType) => {
        const ret:MenuItemType = {label:item.label}
        ret.key = incr()
        // item.key = incr();
        if (item.componentName) {
          componentsMap[ret.key] = item.componentName;
          breadcrumbMap[ret.key] = item.breadcrumb
        } else if (item.children && item.children.length > 0) {
          ret.children = getMenuItems(item.children);
        }
        return ret;
      }
    );
    return menuItemsWithKeys;
  }

  function handleOnClick({ key }: any) {
    store.layouts.isDrawerOpen.set(false)
    store.layouts.selectedComponentName.set(componentsMap[key])
    // store.layouts.selectedComponent.set(componentsMap[key])
    store.content.breadcrumb.set(breadcrumbMap[key])
  }

  function handleOnSelect({ key }: any) {
    store.layouts.sideMenuSelectedKeys.set([key])
  }

  function handleOnOpenChange(openKeys: string[]) {
    const lastOpenKeyIndex = openKeys.length - 1 || 0;
    const lastOpenKey = openKeys[lastOpenKeyIndex];
    store.layouts.sideMenuOpenKeys.set([lastOpenKey])
    store.layouts.sideMenuSelectedKeys.set(["0"])
  }

  function incr() {
    return String(num++);
  }

  return {
    accountsMenu,
    componentsMap,
    getItems,
    handleOnClick,
    handleOnOpenChange,
    handleOnSelect,
    appStore
  };
}
export { useAppSideMenu };

interface MenuItemType {
  breadcrumb?: string;
  children?: MenuItemType[];
  component?: React.FC;
  componentName?: string;
  icon?: any;
  key?: string;
  label: string;
}

const accountsMenu: MenuItemType[] = [
  {
    label: "Home",
    icon: <HomeIcon color="blue" />,
    children: [
      {
        label: "Dashboard",
        // component: AppDashboard,
        componentName: ComponentNamesEnum.appDashboard
      },
    ],
  },
  {
    label: "Vouchers",
    icon: <VouchersIcon color="red" />,
    children: [
      {
        label: "Journals",
        // component: AppJournals,
        componentName: ComponentNamesEnum.appJournals
      },
      {
        label: "Payments",
        // component: AppPayments,
        componentName: ComponentNamesEnum.appPayments
      },
    ],
  },
  {
    label: "Sales / purchases",
    icon: <SalesPurchaseIcon color="green" />,
    children: [
      {
        label: "Sales",
        // component: AppSales,
        componentName: ComponentNamesEnum.appSales,
      },
    ],
  },
];

const superAdminMenu: MenuItemType[] = [
  {
    breadcrumb: 'Super admin dashboard',
    label: "Dashboard",
    icon: <DashboardIcon color="green" />,
    // component: SuperAdminDashboard,
    componentName: ComponentNamesEnum.superAdminDashboard,
  },
  {
    breadcrumb: "Super admin clients",
    label: "Clients",
    icon: <ClientsIcon color="dodgerBlue" />,
    // component: SuperAdminClients,
    componentName: ComponentNamesEnum.superAdminClients,
  },
  // {
  //   breadcrumb: "Super admin roles",
  //   label: "Roles",
  //   icon: <RolesIcon color="red" />,
  //   // component: AppRoles,
  // },
  // {
  //   breadcrumb: "Super admin secured controls",
  //   label: "Secured controls",
  //   icon: <SecuredControlsIcon color="teal" />,
  //   // component: SuperAdminSecuredControls,
  // },
  // {
  //   breadcrumb: "Admin users",
  //   label: "Admin users",
  //   icon: <UsersIcon color="dodgerBlue" />,
  //   // component: SuperAdminAdminUsers,
  // },
];

const adminMenu: MenuItemType[] = [
  {
    breadcrumb: 'Admin dashboard',
    label: "Dashboard",
    icon: <DashboardIcon color="green" />,
    // component: AdminDashboard
  },
  {
    breadcrumb: "Admin business units",
    label: "Business units",
    icon: <BuIcon color="blue" />,
    // component: AdminBusinessUnits,
  },
  {
    breadcrumb: "Admin roles",
    label: "Roles",
    icon: <RolesIcon color="red" />,
    // component: AppRoles,
  },
  {
    breadcrumb: "Business users",
    label: "Business users",
    icon: <UsersIcon color="dodgerBlue" />,
    // component: AdminBusinessUsers,
  },
];
