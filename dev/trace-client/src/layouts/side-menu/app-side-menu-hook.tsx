import {
  BuIcon,
  ClientsIcon,
  DashboardIcon,
  HomeIcon,
  React,
  RolesIcon,
  SalesPurchaseIcon,
  SecuredControlsIcon,
  UsersIcon,
  VouchersIcon,
} from "@src/libs";
import { appStore, SideMenuTypesEnum } from '@src/features'
import {
  AdminBusinessUnits,
  AdminBusinessUsers,
  AdminDashboard,
  AppDashboard,
  AppJournals,
  AppPayments,
  AppRoles,
  AppSales,
  SuperAdminAdminUsers,
  SuperAdminClients,
  SuperAdminDashboard,
  SuperAdminSecuredControls
} from "@src/components";

function useAppSideMenu() {
  const sideMenuType = appStore.layouts.sideMenuType.value;
  let num: number = 1; // For counter
  const componentsMap: { [key: string]: React.FC } = {};
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
        item.key = incr();
        if (item.component) {
          componentsMap[item.key] = item.component;
          breadcrumbMap[item.key] = item.breadcrumb
        } else if (item.children && item.children.length > 0) {
          item.children = getMenuItems(item.children);
        }
        return item;
      }
    );
    return menuItemsWithKeys;
  }

  function handleOnClick({ key }: any) {
    appStore.layouts.isDrawerOpen.value = false;
    appStore.layouts.selectedComponent.value = componentsMap[key];
    appStore.content.breadcrumb.value = breadcrumbMap[key]
  }

  function handleOnSelect({ key }: any) {
    appStore.layouts.sideMenuSelectedKeys.value = [key];
  }

  function handleOnOpenChange(openKeys: string[]) {
    const lastOpenKeyIndex = openKeys.length - 1 || 0;
    const lastOpenKey = openKeys[lastOpenKeyIndex];
    appStore.layouts.sideMenuOpenKeys.value = [lastOpenKey];
    appStore.layouts.sideMenuSelectedKeys.value = ["0"];
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
  };
}
export { useAppSideMenu };

interface MenuItemType {
  breadcrumb?: string;
  children?: MenuItemType[];
  component?: React.FC;
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
        component: AppDashboard,
      },
    ],
  },
  {
    label: "Vouchers",
    icon: <VouchersIcon color="red" />,
    children: [
      {
        label: "Journals",
        component: AppJournals,
      },
      {
        label: "Payments",
        component: AppPayments,
      },
    ],
  },
  {
    label: "Sales / purchases",
    icon: <SalesPurchaseIcon color="green" />,
    children: [
      {
        label: "Sales",
        component: AppSales,
      },
    ],
  },
];

const superAdminMenu: MenuItemType[] = [
  {
    breadcrumb: 'Super admin dashboard',
    label: "Dashboard",
    icon: <DashboardIcon color="green" />,
    component: SuperAdminDashboard,
  },
  {
    breadcrumb: "Super admin clients",
    label: "Clients",
    icon: <ClientsIcon color="dodgerBlue" />,
    component: SuperAdminClients,
  },
  {
    breadcrumb: "Super admin roles",
    label: "Roles",
    icon: <RolesIcon color="red" />,
    component: AppRoles,
  },
  {
    breadcrumb: "Super admin secured controls",
    label: "Secured controls",
    icon: <SecuredControlsIcon color="teal" />,
    component: SuperAdminSecuredControls,
  },
  {
    breadcrumb: "Admin users",
    label: "Admin users",
    icon: <UsersIcon color="dodgerBlue" />,
    component: SuperAdminAdminUsers,
  },
];

const adminMenu: MenuItemType[] = [
  {
    breadcrumb: 'Admin dashboard',
    label: "Dashboard",
    icon: <DashboardIcon color="green" />,
    component: AdminDashboard
  },
  {
    breadcrumb: "Admin business units",
    label: "Business units",
    icon: <BuIcon color="blue" />,
    component: AdminBusinessUnits,
  },
  {
    breadcrumb: "Admin roles",
    label: "Roles",
    icon: <RolesIcon color="red" />,
    component: AppRoles,
  },
  {
    breadcrumb: "Business users",
    label: "Business users",
    icon: <UsersIcon color="dodgerBlue" />,
    component: AdminBusinessUsers,
  },
];
