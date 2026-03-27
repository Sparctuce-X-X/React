import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">📋 TaskManager</Link>
      </div>

      <ul className="navbar-menu">
        {isAuthenticated ? (
          <>
            <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link></li>
            <li><Link to="/tasks" className={isActive('/tasks')}>Mes tâches</Link></li>
            <li className="navbar-user">
              <span>👤 {user?.name}</span>
              <button onClick={handleLogout} className="btn-logout">Déconnexion</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" className={isActive('/login')}>Connexion</Link></li>
            <li><Link to="/register" className={isActive('/register')}>Inscription</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
