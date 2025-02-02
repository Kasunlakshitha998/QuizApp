// Import the icons that you'll use in your menu items.
import { ClipboardList, FilePlus, BarChart2, User } from "lucide-react";

export const menuList = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    icon: ClipboardList,
  },
  {
    id: 2,
    name: "Create Quiz",
    path: "/create-quiz",
    icon: FilePlus,
  },
  {
    id: 3,
    name: "Reports",
    path: "/reports",
    icon: BarChart2,
  },
  {
    id: 4,
    name: "Account",
    path: "/account",
    icon: User,
  },
];
