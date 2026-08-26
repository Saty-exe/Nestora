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
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Staff from "./pages/admin/staff";
import TenantDetails from "./components/tenantDetails";
import AddBooking from "./pages/admin/AddBooking";
import BookingCard from "./pages/admin/BookingsCard";
import BookingDetails from "./components/BookingDetails";
import StaffList from "./pages/admin/StaffList";
import AddStaff from "./pages/admin/AddStaff";
import Sidebar from "./components/sidebar";
import Visitors from "./pages/admin/visitors";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="feedback" element={<Feedbacks />} />
            <Route path="laundry" element={<Laundry />} />
            <Route path="meal" element={<Meal />} />
            <Route path="staff" element={<Staff />}></Route>
            <Route path="notices" element={<Notices />} />
            <Route path="payments" element={<PaymentData />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="tenants" element={<Tenants />} />
            <Route path="sidebar" element={<Sidebar />} />
            <Route path="booking" element={<AddBooking />} />
            <Route path="tenantDetails/:id" element={<TenantDetails />} />
            <Route path="bookingCard" element={<BookingCard />} />
            <Route path="staffList" element={<StaffList />} />
            <Route path="bookingDetails/:id" element={<BookingDetails />} />
            <Route path="addStaff" element={<AddStaff />} />
            <Route path="visitor" element={<Visitors />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
