import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">MyFullProject</Link>

      <div>
        <Link className="btn btn-outline-light me-2" to="/">Login</Link>
        <Link className="btn btn-outline-light me-2" to="/signup">Signup</Link>
        <Link className="btn btn-warning" to="/admin/students">Admin Panel</Link>
      </div>
    </nav>
  );
}
