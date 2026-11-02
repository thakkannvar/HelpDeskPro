
import { useEffect, useState } from "react";
import API from "../services/api";

function CreateTicket() {

    const [employees, setEmployees] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        priority: "MEDIUM",
        employee: ""
    });

    useEffect(() => {
        API.get("employees/")
            .then(response => setEmployees(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const createTicket = async (e) => {
        e.preventDefault();

        try {
            await API.post("tickets/", {
                ...form,
                employee: Number(form.employee)
            });

            alert("Ticket created successfully!");

            setForm({
                title: "",
                description: "",
                category: "",
                priority: "MEDIUM",
                employee: ""
            });

        } catch (error) {
            console.log(error.response?.data);
            alert("Unable to create ticket.");
        }
    };

    return (
        <div>
            <h1>Create Support Ticket</h1>

            <form onSubmit={createTicket} className="employee-form">

                <input
                    name="title"
                    placeholder="Ticket Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Describe your problem"
                    value={form.description}
                    onChange={handleChange}
                    required
                />

                <input
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    required
                />

                <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>

                <select
                    name="employee"
                    value={form.employee}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Employee</option>

                    {employees.map(employee => (
                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>
                    ))}
                </select>

                <button type="submit">Create Ticket</button>

            </form>
        </div>
    );
}

export default CreateTicket;
