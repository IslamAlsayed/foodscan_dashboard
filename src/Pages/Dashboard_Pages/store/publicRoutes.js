//? Icons
import { MdDashboard, MdCreditScore } from "react-icons/md";
import { GiTemporaryShield, GiStorkDelivery } from "react-icons/gi";
import { LiaTableSolid } from "react-icons/lia";
import { SiNextra } from "react-icons/si";
import { TbDeviceIpadDollar, TbTruckDelivery } from "react-icons/tb";
import { FaSignsPost, FaUserGroup } from "react-icons/fa6";
import { BiCategory, BiSolidOffer } from "react-icons/bi";
import { FaUser, FaUsers } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiAlignItemBottomLine } from "react-icons/ri";

//? Pages
import Dashboard from "../Pages/Dashboard";
import Meals from "../Pages/Meals/Meals";
import Categories from "../Pages/Categories/Categories";
import DiningTables from "../Pages/DiningTables/DiningTables";
import Extras from "../Pages/Extras/Extras";
import Addons from "../Pages/Addons/Addons";
import Pos from "../Pages/Pos/Pos";
import DeliveryOrders from "../Pages/DeliveryOrders/DeliveryOrders";
import TablesOrders from "../Pages/TablesOrders/TablesOrders";
import Offers from "../Pages/Offers/Offers";
import Administrators from "../Pages/Administrators/Administrators";
import Customers from "../Pages/Customers/Customers";
import Employees from "../Pages/Employees/Employees";
import Transactions from "../Pages/Transactions";
import SalesReports from "../Pages/SalesReports";
import ItemsReports from "../Pages/ItemsReports";
import CreditBalanceReport from "../Pages/CreditBalanceReport";

const routes = [
  {
    items: [
      {
        id: "1",
        path: "/admin/dashboard",
        name: "Dashboard",
        icon: MdDashboard,
        component: Dashboard,
      },
      {
        id: "2",
        path: "/admin/dashboard/meals",
        name: "Meals",
        icon: GiTemporaryShield,
        component: Meals,
      },
      {
        id: "3",
        path: "/admin/dashboard/categories",
        name: "Categories",
        icon: BiCategory,
        component: Categories,
      },
      {
        id: "4",
        path: "/admin/dashboard/dining-tables",
        name: "Dining Tables",
        icon: LiaTableSolid,
        component: DiningTables,
      },
      {
        id: "5",
        path: "/admin/dashboard/extras",
        name: "Extras",
        icon: SiNextra,
        component: Extras,
      },
      {
        id: "6",
        path: "/admin/dashboard/addons",
        name: "Addons",
        icon: TbDeviceIpadDollar,
        component: Addons,
      },
    ],
  },
  {
    label: "pos & orders",
    items: [
      {
        id: "6",
        path: "/admin/dashboard/pos",
        name: "Pos Menu",
        icon: FaSignsPost,
        component: Pos,
      },
      {
        id: "7",
        path: "/admin/dashboard/delivery-orders",
        name: "Delivery Orders",
        icon: TbTruckDelivery,
        component: DeliveryOrders,
      },
      {
        id: "8",
        path: "/admin/dashboard/tables-orders",
        name: "Table Orders",
        icon: GiStorkDelivery,
        component: TablesOrders,
      },
    ],
  },
  {
    label: "promo",
    items: [
      {
        id: "9",
        path: "/admin/dashboard/offers",
        name: "Offers",
        icon: BiSolidOffer,
        component: Offers,
      },
    ],
  },
  {
    label: "users",
    items: [
      {
        id: "10",
        path: "/admin/dashboard/administrators",
        name: "Administrators",
        icon: FaUser,
        component: Administrators,
      },
      {
        id: "11",
        path: "/admin/dashboard/customers",
        name: "Customers",
        icon: FaUsers,
        component: Customers,
      },
      {
        id: "12",
        path: "/admin/dashboard/employees",
        name: "Employees",
        icon: FaUserGroup,
        component: Employees,
      },
    ],
  },
  {
    label: "accounts",
    items: [
      {
        id: "13",
        path: "/admin/dashboard/transactions",
        name: "Transactions",
        icon: GrTransaction,
        component: Transactions,
      },
    ],
  },
  {
    label: "reports",
    items: [
      {
        id: "14",
        path: "/admin/dashboard/sales-reports",
        name: "Sales Reports",
        icon: BsGraphUpArrow,
        component: SalesReports,
      },
      {
        id: "15",
        path: "/admin/dashboard/items-reports",
        name: "Items Reports",
        icon: RiAlignItemBottomLine,
        component: ItemsReports,
      },
      {
        id: "16",
        path: "/admin/dashboard/credit-balance-report",
        name: "Credit Balance Report",
        icon: MdCreditScore,
        component: CreditBalanceReport,
      },
    ],
  },
];

export default routes;
