import { isUrl } from "../utils/";

const menuData = [
  {
    name: "Home",
    icon: "desktop",
    path: "home",
    children: [
      {
        name: "工作台",
        path: "workspace",
        // hideInMenu: true,
      },
    ],
  },
];

function formatter(data, parentPath = "", parentAuthority) {
  return data.map((item) => {
    const newItem = item;
    if (!isUrl(newItem.path)) {
      newItem.path = `${parentPath}${newItem.path}`;
    }
    const result = {
      ...newItem,
      path: newItem.path,
      authority: newItem.authority || parentAuthority,
    };
    if (newItem.children) {
      result.children = formatter(
        newItem.children,
        `${parentPath}${newItem.path}/`,
        newItem.authority
      );
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
