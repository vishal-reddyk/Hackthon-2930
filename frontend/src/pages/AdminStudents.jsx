import { useEffect, useState } from "react";

export default function AdminStudents() {
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loadStudents = async () => {
    const res = await fetch("http://localhost:5000/admin/students", {
      headers: { Authorization: "Bearer " + token }
    });

    const data = await res.json();
    if (data.success) setStudents(data.students);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const addStudent = async () => {
    const res = await fetch("http://localhost:5000/admin/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    alert(data.message);
    if (data.success) loadStudents();
  };

  const deleteStudent = async (id) => {
    const res = await fetch(`http://localhost:5000/admin/students/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    });

    const data = await res.json();
    alert(data.message);
    if (data.success) loadStudents();
  };

  return (
    <div className="container mt-5">
      <h2>Admin Panel – Manage Students</h2>

      <div className="card p-3 my-4">
        <h4>Add Student</h4>

        <input className="form-control my-2" placeholder="Name"
          onChange={(e) => setName(e.target.value)} />

        <input className="form-control my-2" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input className="form-control my-2" placeholder="Password" type="password"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-primary" onClick={addStudent}>Add</button>
      </div>

      <div className="card p-3">
        <h4>Student List</h4>

        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>
                  <button className="btn btn-danger btn-sm"
                    onClick={() => deleteStudent(s._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
