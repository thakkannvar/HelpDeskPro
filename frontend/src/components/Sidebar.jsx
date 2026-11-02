import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div className="sidebar">

            <h2>HelpDeskPro</h2>

            <ul>

                <li>
                    <Link to="/">Dashboard</Link>
                </li>

                <li>
                    <Link to="/employees">Employees</Link>
                </li>

                <li>
                    <Link to="/tickets">Tickets</Link>
                </li>

                <li>
                    <Link to="/create-ticket">Create Ticket</Link>
                </li>

                <li>
                    <Link to="/assets">Assets</Link>
                </li>

            </ul>

        </div>

    );
}

export default Sidebar;