import { useEffect, useState } from "react";
import API from "../services/api";

function Assets() {

    const [assets, setAssets] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [form, setForm] = useState({
        asset_name: "",
        asset_type: "LAPTOP",
        serial_number: "",
        assigned_to: "",
        status: "AVAILABLE"
    });

    useEffect(() => {

        fetchAssets();

        API.get("employees/")
            .then(response => setEmployees(response.data))
            .catch(error => console.log(error));

    }, []);

    const fetchAssets = async () => {

        try {

            const response = await API.get("assets/");

            setAssets(response.data);

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

    const addAsset = async (e) => {

        e.preventDefault();

        try {

            const data = {
                ...form,
                assigned_to: form.assigned_to
                    ? Number(form.assigned_to)
                    : null
            };

            await API.post("assets/", data);

            alert("Asset added successfully!");

            setForm({
                asset_name: "",
                asset_type: "LAPTOP",
                serial_number: "",
                assigned_to: "",
                status: "AVAILABLE"
            });

            fetchAssets();

        } catch (error) {

            console.log(error.response?.data);

            alert("Unable to add asset.");

        }

    };

    return (

        <div>

            <h1>Asset Management</h1>
            <h3>Asset List</h3>

            <form onSubmit={addAsset} className="employee-form">

                <input
                    name="asset_name"
                    placeholder="Asset Name"
                    value={form.asset_name}
                    onChange={handleChange}
                    required
                />

                <select
                    name="asset_type"
                    value={form.asset_type}
                    onChange={handleChange}
                >

                    <option value="LAPTOP">Laptop</option>
                    <option value="DESKTOP">Desktop</option>
                    <option value="PRINTER">Printer</option>
                    <option value="MONITOR">Monitor</option>

                </select>

                <input
                    name="serial_number"
                    placeholder="Serial Number"
                    value={form.serial_number}
                    onChange={handleChange}
                    required
                />

                <select
                    name="assigned_to"
                    value={form.assigned_to}
                    onChange={handleChange}
                >

                    <option value="">Not assigned</option>

                    {employees.map(employee => (

                        <option key={employee.id} value={employee.id}>
                            {employee.name}
                        </option>

                    ))}

                </select>

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >

                    <option value="AVAILABLE">Available</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="REPAIR">Under Repair</option>

                </select>

                <button type="submit">Add Asset</button>

            </form>

            <h2>Asset List</h2>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Serial Number</th>
                        <th>Status</th>
                        <th>Employee ID</th>
                    </tr>

                </thead>

                <tbody>

                    {assets.map(asset => (

                        <tr key={asset.id}>

                            <td>{asset.id}</td>
                            <td>{asset.asset_name}</td>
                            <td>{asset.asset_type}</td>
                            <td>{asset.serial_number}</td>
                            <td>{asset.status}</td>
                            <td>{asset.assigned_to || "Not assigned"}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Assets;