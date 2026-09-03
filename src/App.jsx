import Login from "./pages/admin/login";
import Dashboard from "./pages/admin/dashboard";
import Complaints from "./pages/admin/complaints";
import Feedbacks from "./pages/admin/feedbacks";
import Laundry from "./pages/admin/laundry";
import Meal from "./pages/admin/meal";
import Notices from "./pages/admin/notices";
import PaymentData from "./pages/admin/paymentData";
import Rooms from "./pages/admin/rooms";
import Tenants from "./pages/admin/tenants";
import AdminLayout from "./layout/AdminLayout";

import Staff from "./pages/admin/staff";
import TenantDetails from "./components/admin/tenantDetails";
import AddBooking from "./pages/admin/AddBooking";
import BookingCard from "./pages/admin/BookingsCard";
import BookingDetails from "./components/admin/BookingDetails";
import StaffList from "./pages/admin/StaffList";
import AddStaff from "./pages/admin/AddStaff";
import Visitors from "./pages/admin/visitors";
import AdminHousekeeping from "./pages/admin/housekeeping";

import UserLayout from "./layout/UserLayout";
import ComplaintUser from "./pages/users/complaintsBox";
import UserHome from "./pages/users/userHome";
import Facilities from "./pages/users/facilities";
import FoodInfo from "./pages/users/foodInfo";
import LaundryInfo from "./pages/users/laundryinfo";
import PaymentPage from "./pages/users/PaymentPage";
import SettingsPage from "./pages/users/SettingsPage";
import Housekeeping from "./pages/users/housekeeping";

import ReferAndEarn from "./pages/users/referAndEarn";

import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import VisitorRequest from "./components/user/visitorRequest";
import TicketsPage from "./pages/shared/TicketsPage";

const adminRoutes = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "complaints", element: <Complaints /> },
  { path: "feedback", element: <Feedbacks /> },
  { path: "laundry", element: <Laundry /> },
  { path: "meal", element: <Meal /> },
  { path: "staff", element: <Staff /> },
  { path: "notices", element: <Notices /> },
  { path: "payments", element: <PaymentData /> },
  { path: "rooms", element: <Rooms /> },
  { path: "tenants", element: <Tenants /> },
  { path: "booking", element: <AddBooking /> },
  { path: "tenantDetails/:id", element: <TenantDetails /> },
  { path: "bookingCard", element: <BookingCard /> },
  { path: "staffList", element: <StaffList /> },
  { path: "bookingDetails/:id", element: <BookingDetails /> },
  { path: "addStaff", element: <AddStaff /> },
  { path: "visitor", element: <Visitors /> },
  { path: "housekeeping", element: <AdminHousekeeping /> },
  { path: "tickets", element: <TicketsPage role="admin" /> },
];

const userRoutes = [
  { path: "home", element: <UserHome /> },
  { path: "userHome", element: <UserHome /> },
  { path: "complaints", element: <ComplaintUser /> },
  { path: "facilities", element: <Facilities /> },
  { path: "food-info", element: <FoodInfo /> },
  { path: "laundry-info", element: <LaundryInfo /> },
  { path: "payment", element: <PaymentPage /> },
  { path: "settings", element: <SettingsPage /> },
  { path: "contact", element: <ComplaintUser /> },
  { path: "referralPage", element: <ReferAndEarn /> },
  { path: "visitorRequest", element: <VisitorRequest /> },
  { path: "housekeeping", element: <Housekeeping /> },
  { path: "tickets", element: <TicketsPage role="resident" /> },
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          {adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserHome />} />

          {userRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
