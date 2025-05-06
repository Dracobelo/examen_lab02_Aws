import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') ? true : false;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand">Sistema de Gestión</Link>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/clientes">Clientes</Link>
            <Link to="/productos">Productos</Link>
            <a href="" onClick={handleLogout}>Cerrar Sesión</a>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;