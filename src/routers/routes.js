import pathToRegexp from "path-to-regexp";
import { getMenuData } from "./menus";
// 组件:Components
import AsyncComponent from "../components/AsyncComponent";

function getFlatMenuData(menus) {
  const keys = { value: {} };
  menus.forEach((item) => {
    if (item.children) {
      keys.value[item.path] = { ...item };
      keys.value = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys.value[item.path] = { ...item };
    }
  });
  return keys.value;
}

export const getRouterData = () => {
  const routerConfig = {
    "/": {
      component: AsyncComponent(() => import("../layouts/DefaultLayout")),
    },
    "/user": {
      component: AsyncComponent(() => import("../layouts/UserLayout")),
    },
  };
  const routerData = {};
  const menuData = getFlatMenuData(getMenuData());

  Object.keys(routerConfig).forEach((path) => {
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));

    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];

    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });

  // console.log(routerData, 'routerData');
  return routerData;
};
