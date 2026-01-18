import React, { useState } from "react";
import api from "../../api";
import "./StudentList.css";

const StudentList = () => {
    const [telephone, setTelephone] = useState(""); // search input
    const [student, setStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [isEmailValid, setIsEmailValid] = useState(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [isTelephoneValid, setIsTelephoneValid] = useState(true);
    const telephoneRegex = /^\d*$/;

    const searchStudent = async () => {
        if (!telephone.trim()) {
            alert("Please enter a telephone number to search");
            return;
        }

        try {
            const res = await api.get(`/students/by-telephone/${telephone}`);
            setStudent(res.data);
            setIsEditing(false);
            setIsEmailValid(true);
            setIsTelephoneValid(true);
        } catch {
            alert("Student not found");
            setStudent(null);
            setIsEditing(false);
        }
    };

    const deleteStudent = async (id) => {
        await api.delete(`/students/${id}`);
        alert("Deleted");
        setStudent(null);
    };

    const saveStudent = async () => {
        if (!isEmailValid) {
            alert("Please enter a valid email address before saving.");
            return;
        }

        if (!isTelephoneValid) {
            alert("Please enter a valid telephone number before saving.");
            return;
        }

        try {
            await api.put(`/students/${student.id}`, {
                fullName: student.fullName,
                dateOfBirth: student.dateOfBirth,
                email: student.email,
                telephone: student.telephone,
            });
            alert("Updated successfully");
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            alert("Error updating student");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "searchTelephone") {
            const isValid = telephoneRegex.test(value);
            setIsTelephoneValid(isValid);
            if (!isValid) return;
            setTelephone(value);
            return;
        }

        if (name === "email") {
            setIsEmailValid(emailRegex.test(value));
        }

        if (name === "telephone") {
            const isValid = telephoneRegex.test(value);
            setIsTelephoneValid(isValid);
            if (!isValid) return;
        }

        setStudent({ ...student, [name]: value });
    };

    return (
        <div className="student-list-container">
            <h2>Student List</h2>

            <div className="search">
                <div className="search-section">
                    <label>Telephone</label>
                </div>

                <div className="form-input">
                    <input
                        type="text"
                        name="searchTelephone"
                        value={telephone}
                        onChange={handleChange}
                        maxLength={10}
                    />
                    <button type="button" onClick={searchStudent}>
                        Search
                    </button>
                </div>

                <div className="table-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date of Birth</th>
                                <th>Email</th>
                                <th>Telephone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student && (
                                <tr>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                className="table-input"
                                                name="fullName"
                                                value={student.fullName}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            student.fullName
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                className="table-input"
                                                type="date"
                                                name="dateOfBirth"
                                                value={student.dateOfBirth}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            student.dateOfBirth
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                className="table-input"
                                                name="email"
                                                value={student.email}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            student.email
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                className="table-input"
                                                name="telephone"
                                                value={student.telephone}
                                                onChange={handleChange}
                                                maxLength={10}
                                            />
                                        ) : (
                                            student.telephone
                                        )}
                                    </td>
                                    <td>
                                        {isEditing ? (
                                            <button
                                                className="btn-save"
                                                onClick={saveStudent}
                                            >
                                                <i className="bx bx-save"></i>
                                            </button>
                                        ) : (
                                            <button
                                                className="btn-edit"
                                                onClick={() => setIsEditing(true)}
                                            >
                                                <i className="bx bx-edit"></i>
                                            </button>
                                        )}
                                        <button
                                            className="btn-delete"
                                            onClick={() => deleteStudent(student.id)}
                                        >
                                            <i className="bx bx-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <br />
                <br />
                <br />
                <br />
                <br />
                <hr />
            </div>
        </div>
    );
};

export default StudentList;
