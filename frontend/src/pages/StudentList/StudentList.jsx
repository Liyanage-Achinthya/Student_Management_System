import React, { useState } from "react";
import api from "../../api";
import "./StudentList.css";

const StudentList = () => {
    const [telephone, setTelephone] = useState("");
    const [student, setStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleTelephoneInput = (value, setter) => {
        if (/^\d*$/.test(value)) {
            setter(value);
        }
    };

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

        if (name === "telephone" && !/^\d*$/.test(value)) return;

        if (name === "email") {
            setIsEmailValid(emailRegex.test(value));
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
                        value={telephone}
                        onChange={(e) =>
                            handleTelephoneInput(e.target.value, setTelephone)
                        }
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
                                            <div>
                                                <input
                                                    className="table-input"
                                                    name="email"
                                                    value={student.email}
                                                    onChange={handleChange}
                                                />
                                                {!isEmailValid && (
                                                    <p className="email-error">
                                                        Please enter a valid email address.
                                                    </p>
                                                )}
                                            </div>
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
