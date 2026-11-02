import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {

        fetchDashboardData();

    }, []);

    const fetchDashboardData = async () => {

        try {

            const employeeResponse = await API.get("employees/");
            const ticketResponse = await API.get("tickets/");
            const assetResponse = await API.get("assets/");

            setEmployees(employeeResponse.data);
            setTickets(ticketResponse.data);
            setAssets(assetResponse.data);

        } catch (error) {

            console.log("Error fetching dashboard data:", error);

        }

    };

    const openTickets = tickets.filter(
        ticket => ticket.status === "OPEN"
    ).length;

    const resolvedTickets = tickets.filter(
        ticket => ticket.status === "RESOLVED"
    ).length;

    return (

        <div>

            <h1>Dashboard</h1>

            <div className="dashboard-cards">

                <div className="card">
                    <h3>Total Employees</h3>
                    <h2>{employees.length}</h2>
                </div>

                <div className="card">
                    <h3>Total Tickets</h3>
                    <h2>{tickets.length}</h2>
                </div>

                <div className="card">
                    <h3>Open Tickets</h3>
                    <h2>{openTickets}</h2>
                </div>

                <div className="card">
                    <h3>Resolved Tickets</h3>
                    <h2>{resolvedTickets}</h2>
                </div>

                <div className="card">
                    <h3>Total Assets</h3>
                    <h2>{assets.length}</h2>
                </div>

            </div>

        </div>

    );

}

export default Dashboard;