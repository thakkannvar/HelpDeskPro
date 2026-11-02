import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import Assets from "./pages/Assets";

import "./App.css";

function App() {

    return (
        <BrowserRouter>

            <div className="app-container">

                <Sidebar />

                <div className="main-content">

                    <Routes>

                        <Route path="/" element={<Dashboard />} />

                        <Route path="/employees" element={<Employees />} />

                        <Route path="/tickets" element={<Tickets />} />

                        <Route path="/create-ticket" element={<CreateTicket />} />

                        <Route path="/assets" element={<Assets />} />

                    </Routes>

                </div>

            </div>

        </BrowserRouter>
    );
}

export default App;