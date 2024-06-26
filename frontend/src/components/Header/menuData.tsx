import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Demand Now",
    path: "/demandnow",
    newTab: false,
  },
  {
    id: 3,
    title: "Join Discussions Now",
    path: "https://github.com/rameshkrishna/CanadianHealthCareCrisis/discussions",
    newTab: true,
  },
  // {
  //   id: 4,
  //   title: "Contact",
  //   path: "/contact",
  //   newTab: false,
  // },
  {
    id: 4,
    title: "Resources",
    path: "/resources",
    newTab: false,
  },
  // {
  //   id: 4,
  //   title: "Pathways To Emigrate",
  //   path: "/pathways-to-emigrate",
  //   newTab: false,
  // },
];
export default menuData;
