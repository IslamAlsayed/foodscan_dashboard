//? Icons
import { GiTemporaryShield } from "react-icons/gi";
import { PiPicnicTableBold } from "react-icons/pi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { BiSolidOffer } from "react-icons/bi";
import { FaUser, FaUsers } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

//? Show pages
import ShowMeal from "../Pages/Meals/Show";
import ShowCategory from "../Pages/Categories/Show";
import ShowDiningTable from "../Pages/DiningTables/Show";
import ShowExtra from "../Pages/Extras/Show";
import ShowAddon from "../Pages/Addons/Show";
import ShowDeliveryOrder from "../Pages/DeliveryOrders/Show";
import ShowOffer from "../Pages/Offers/Show";
import ShowAdministrator from "../Pages/Administrators/Show";
import ShowCustomer from "../Pages/Customers/Show";
import DetailsCustomer from "../Pages/Customers/Details";
import ShowEmployee from "../Pages/Employees/Show";

const privateRoutes = [
  {
    path: "/admin/dashboard/meals/show/:id",
    name: "show meal",
    icon: GiTemporaryShield,
    component: ShowMeal,
  },
  {
    path: "/admin/dashboard/categories/show/:id",
    name: "show category",
    icon: GiTemporaryShield,
    component: ShowCategory,
  },
  {
    path: "/admin/dashboard/dining-table/show/:id",
    name: "show dining table",
    icon: PiPicnicTableBold,
    component: ShowDiningTable,
  },
  {
    path: "/admin/dashboard/extra/show/:id",
    name: "show extra",
    icon: PiPicnicTableBold,
    component: ShowExtra,
  },
  {
    path: "/admin/dashboard/addon/show/:id",
    name: "show addon",
    icon: PiPicnicTableBold,
    component: ShowAddon,
  },
  {
    path: "/admin/dashboard/delivery-order/show/:id",
    name: "show delivery order",
    icon: LuFileSpreadsheet,
    component: ShowDeliveryOrder,
  },
  {
    path: "/admin/dashboard/offer/show/:id",
    name: "show offer",
    icon: BiSolidOffer,
    component: ShowOffer,
  },
  {
    path: "/admin/dashboard/administrator/show/:id",
    name: "show Administrator",
    icon: FaUser,
    component: ShowAdministrator,
  },
  {
    path: "/admin/dashboard/customer/show/:id",
    name: "show Customer",
    icon: FaUsers,
    component: ShowCustomer,
  },
  {
    path: "/admin/dashboard/details-order/:id/:id",
    name: "details order",
    icon: FaUsers,
    component: DetailsCustomer,
  },
  {
    path: "/admin/dashboard/employee/show/:id",
    name: "show Employee",
    icon: FaUserGroup,
    component: ShowEmployee,
  },
];

export default privateRoutes;
