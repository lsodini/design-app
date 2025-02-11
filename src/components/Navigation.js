import { Link } from 'react-router-dom'; // Se stai usando React Router per la navigazione

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Design Styles</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/brutalism">Brutalism</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/minimalism">Minimalism</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/quotes">Altro design</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
