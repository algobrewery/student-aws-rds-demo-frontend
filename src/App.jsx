import React, { useEffect, useState } from "react";
import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./api/studentApi";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", id: null });
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const handleAddOrUpdate = async () => {
    if (!form.name || !form.age) return alert("Fill all fields");
    if (form.id) {
      await updateStudent(form.id, { name: form.name, age: parseFloat(form.age) });
    } else {
      await createStudent({ name: form.name, age: parseFloat(form.age) });
    }
    setForm({ name: "", age: "", id: null });
    loadStudents();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, age: student.age, id: student.id });
  };

  const handleSearch = async () => {
    if (!searchId) return loadStudents();
    const student = await getStudent(searchId);
    setStudents(student ? [student] : []);
  };

  const handleReset = () => {
    setSearchId(""); 
    setForm({ name: "", age: "", id: null }); 
    loadStudents(); 
  };

  return (
    <div className="container">
      <h1>Student CRUD App</h1>

      <div className="form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <button onClick={handleAddOrUpdate}>
          {form.id ? "Update Student" : "Add Student"}
        </button>
      </div>

      <div className="search">
        <input
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(s)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
