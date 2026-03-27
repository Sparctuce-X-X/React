import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Layout.css';

// Composant Layout : structure commune à toutes les pages
const Layout = ({ children }) => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} TaskManager — TP React</p>
      </footer>
    </div>
  );
};

export default Layout;
