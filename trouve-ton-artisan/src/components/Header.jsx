import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur catégories:", err));
  }, []);

  return (
    <header className="bg-light p-3 border-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
          <h1 className="h4 m-0">Trouve ton artisan</h1>
        </Link>
        <nav>
          <ul className="nav">
            {categories.map((cat) => (
              <li className="nav-item" key={cat.id}>
                <Link className="nav-link" to={`/categories/${cat.nom}`}>
                  {cat.nom}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
