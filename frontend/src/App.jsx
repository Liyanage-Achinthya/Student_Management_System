import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentForm from "./pages/StudentForm/StudentForm";
import StudentList from "./pages/StudentList/StudentList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentForm />} />
        <Route path="/list" element={<StudentList />} />
      </Routes>
    </Router>
  );
};

export default App;
