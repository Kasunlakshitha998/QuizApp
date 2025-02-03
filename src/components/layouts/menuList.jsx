// Import the icons that you'll use in your menu items.
import { ClipboardList, FilePlus, BarChart2, User, FileQuestion } from "lucide-react";

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
    name: "Quizzes List",
    path: "/quizzes",
    icon: FileQuestion,
  },
  {
    id: 4,
    name: "Reports",
    path: "/reports",
    icon: BarChart2,
  },
  {
    id: 5,
    name: "Account",
    path: "/profile",
    icon: User,
  },
];
