import Home from "./pages/home"
import Login from "./pages/login"
import Announcement from "./pages/Announcement"
import CalendarPage from "./pages/CalendarPage"
import Request from "./pages/Request"
import Personal from "./pages/Personal"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRouter() {
  return (
    <Routes>

        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="announcement" element={<Announcement/>} />
        <Route path="calendar" element={<CalendarPage/>} />
        <Route path="request" element={<Request/>} />
        <Route path="personal" element={<Personal/>} />
        
    </Routes>



    );
}

export default AppRouter;
