import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useForm from '../hooks/useForm';
import './Auth.css';

const Register = () => {
  const { handleRegister, loading, error } = useAuth();
  const navigate = useNavigate();
  const { values, errors, handleChange, setFieldError } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!values.name) return setFieldError('name', 'Nom requis');
    if (!values.email) return setFieldError('email', 'Email requis');
    if (values.password.length < 6)
      return setFieldError('password', 'Minimum 6 caractères');
    if (values.password !== values.confirmPassword)
      return setFieldError('confirmPassword', 'Les mots de passe ne correspondent pas');

    try {
      await handleRegister(values.name, values.email, values.password);
      navigate('/dashboard');
    } catch {
      // L'erreur est gérée dans le hook useAuth
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Créer un compte</h2>
        <p className="auth-subtitle">Rejoignez TaskManager</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input
              id="name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Jean Dupont"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

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
              placeholder="Minimum 6 caractères"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && (
              <span className="field-error">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Création...' : "Créer mon compte"}
          </button>
        </form>

        <p className="auth-footer">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
