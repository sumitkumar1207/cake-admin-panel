/* eslint-disable */
// @material-ui/icons
import List from "@material-ui/icons/List";
import People from "@material-ui/icons/People";
import CakeIcon from '@material-ui/icons/Cake';
import Add from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import WidgetsIcon from "@material-ui/icons/Widgets";
import HealingIcon from '@material-ui/icons/Healing';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
/**
 * COMPONENTS:
 */
import Dashboard from "viewPages/Dashboard";
//Cake components
import AddCakes from "viewPages/Cakes/AddCakes";

import DashboardUserList from "viewPages/User/DashboardUserList";
import UserList from "viewPages/User/UserList";
import Addusers from "viewPages/User/Addusers";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin",
    visible: true
  },
  {
    collapse: true,
    name: "Cakes",
    icon: CakeIcon,
    rtlName: "",
    state: "cakesCollapse",
    views: [
      {
        path: "/add-cakes",
        name: "Add Cakes",
        mini: "AD",
        component: AddCakes,
        layout: "/admin",
        visible: true
      },
    ]
  },
];
export default dashRoutes;
