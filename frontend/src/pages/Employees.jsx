import { useEffect, useState } from "react";
import API from "../services/api";

function Employees() {

    const [employees, setEmployees] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        department: "",
        designation: "",
        role: "EMPLOYEE"
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {

        try {

            const response = await API.get("employees/");

            setEmployees(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const addEmployee = async (e) => {

        e.preventDefault();

        try {

            await API.post("employees/", form);

            alert("Employee added successfully");

            setForm({
                name: "",
                email: "",
                department: "",
                designation: "",
                role: "EMPLOYEE"
            });

            fetchEmployees();

        } catch (error) {

            alert("Unable to add employee. Check the details.");

            console.log(error.response?.data);

        }

    };

    const deleteEmployee = async (id) => {

        if (!window.confirm("Are you sure you want to delete this employee?")) {
            return;
        }

        try {

            await API.delete(`employees/${id}/`);

            fetchEmployees();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <h1>Employee Management</h1>

            <form onSubmit={addEmployee} className="employee-form">

                <input
                    name="name"
                    placeholder="Employee Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                    required
                />

                <input
                    name="designation"
                    placeholder="Designation"
                    value={form.designation}
                    onChange={handleChange}
                    required
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="EMPLOYEE">Employee</option>
                    <option value="TECHNICIAN">Technician</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <button type="submit">Add Employee</button>

            </form>

            <h2>Employee List</h2>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {employees.map((employee) => (

                        <tr key={employee.id}>

                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.role}</td>

                            <td>

                                <button
                                    onClick={() => deleteEmployee(employee.id)}
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

export default Employees;