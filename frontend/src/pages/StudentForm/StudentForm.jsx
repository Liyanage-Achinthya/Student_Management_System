import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./StudentForm.css";

const StudentForm = () => {
    const [form, setForm] = useState({
        fullName: "",
        address: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        telephone: "",
    });

    const [students, setStudents] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addStudentToTable = () => {
        setStudents([...students, form]);
        setForm({
            fullName: "",
            address: "",
            dateOfBirth: "",
            gender: "",
            email: "",
            telephone: "",
        });
    };

    const submitToDatabase = async () => {
        try {
            for (const student of students) {
                await api.post("/students", {
                    FullName: student.fullName,
                    Address: student.address,
                    DateOfBirth: student.dateOfBirth,
                    Gender: student.gender,
                    Email: student.email,
                    Telephone: student.telephone,
                });
            }
            alert("Student saved successfully");
            setStudents([]);

            navigate("/list");
        } catch (error) {
            console.error("Error saving students:", error.response || error);
            alert("Error saving student");
        }
    };

    return (
        <div className="student-main">
            <h1>Student Registration</h1>

            <div className="student-form">
                <form className="student-form">
                    <div className="form-row">
                        <label>Full Name</label>
                        <div className="form-control">
                            <input
                                type="text"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <label>Address</label>
                        <div className="form-control">
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <label>Date of Birth</label>
                        <div className="form-control dob-gender">
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={form.dateOfBirth}
                                onChange={handleChange}
                            />
                            <span className="gender-label">Gender</span>
                            <div className="radio-group">
                                <label className="radio-option">
                                    Male
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={form.gender === "Male"}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="radio-option">
                                    Female
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={form.gender === "Female"}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <label>Email</label>
                        <div className="form-control">
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <label>Telephone</label>
                        <div className="form-control input-telephone">
                            <input
                                type="text"
                                name="telephone"
                                value={form.telephone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-button">
                        <button type="button" onClick={addStudentToTable}>
                            Add
                        </button>
                    </div>
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Telephone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s, index) => (
                            <tr key={index}>
                                <td>{s.fullName}</td>
                                <td>{s.dateOfBirth}</td>
                                <td>{s.email}</td>
                                <td>{s.telephone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <br />
                <br />
                <br />
                <br />
                <br />
                <hr />

                <div className="form-submit">
                    <button onClick={submitToDatabase}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default StudentForm;
