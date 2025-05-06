import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('No hay token de autenticación');
          setLoading(false);
          return;
        }
        
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const API_URL = process.env.REACT_APP_API_URL;
        const res = await axios.get(`${API_URL}/api/clientes`, config);
        setClientes(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar la lista de clientes');
        setLoading(false);
      }
    };
    
    fetchClientes();
  }, []);

  if (loading) {
    return <div className="card">Cargando...</div>;
  }

  return (
    <div className="card">
      <h2 className="title">Lista de Clientes</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha de Registro</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={cliente.id}>
                <td>{index + 1}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>
                  {new Date(cliente.fecha_registro).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <div className="mt-3">
        <Link to="/productos" className="btn btn-primary">Ver Productos</Link>
      </div>
    </div>
  );
};

export default ClientesList;