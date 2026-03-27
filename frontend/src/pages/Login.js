import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useForm from '../hooks/useForm';
import './Auth.css';

const Login = () => {
  const { handleLogin, loading, error } = useAuth();
  const navigate = useNavigate();
  const { values, errors, handleChange, setFieldError } = useForm({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple côté client
    if (!values.email) return setFieldError('email', 'Email requis');
    if (!values.password) return setFieldError('password', 'Mot de passe requis');

    try {
      await handleLogin(values.email, values.password);
      navigate('/dashboard');
    } catch {
      // L'erreur est gérée dans le hook useAuth
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Connexion</h2>
        <p className="auth-subtitle">Bon retour sur TaskManager</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="vous@exemple.fr"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="auth-footer">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
