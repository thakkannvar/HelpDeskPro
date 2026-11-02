import { useEffect, useState } from "react";
import API from "../services/api";

function Tickets() {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {

        try {

            const response = await API.get("tickets/");

            setTickets(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const updateStatus = async (id, status) => {

        try {

            await API.patch(`tickets/${id}/`, {
                status: status
            });

            fetchTickets();

        } catch (error) {

            console.log(error);

        }

    };

    const deleteTicket = async (id) => {

        if (!window.confirm("Delete this ticket?")) {
            return;
        }

        try {

            await API.delete(`tickets/${id}/`);

            fetchTickets();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <h1>Ticket Management</h1>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Employee ID</th>
                        <th>Technician ID</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {tickets.map((ticket) => (

                        <tr key={ticket.id}>

                            <td>{ticket.id}</td>

                            <td>{ticket.title}</td>

                            <td>{ticket.category}</td>

                            <td>{ticket.priority}</td>

                            <td>

                                <select
                                    value={ticket.status}
                                    onChange={(e) =>
                                        updateStatus(ticket.id, e.target.value)
                                    }
                                >

                                    <option value="OPEN">Open</option>

                                    <option value="IN_PROGRESS">In Progress</option>

                                    <option value="RESOLVED">Resolved</option>

                                    <option value="CLOSED">Closed</option>

                                </select>

                            </td>

                            <td>{ticket.employee}</td>

                            <td>{ticket.technician || "Not assigned"}</td>

                            <td>

                                <button
                                    onClick={() => deleteTicket(ticket.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Tickets;