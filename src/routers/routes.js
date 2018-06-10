import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menus';

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = () => {
  const routerConfig = {
    '/home': {
      component: () => import('../pages/Home'),
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
