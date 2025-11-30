import "./RoleSelection.css";

export default function RoleSelection({ onSelectRole }) {
  return (
    <div className="role-select-container">
      <h1>Welcome</h1>
      <p>Select your role to continue</p>

      <div className="role-buttons">
        <button
          className="role-btn student-btn"
          onClick={() => onSelectRole("student")}
        >
          Login as Student
        </button>

        <button
          className="role-btn admin-btn"
          onClick={() => onSelectRole("admin")}
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}
