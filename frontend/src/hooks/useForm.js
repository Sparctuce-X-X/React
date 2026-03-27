import { useState } from 'react';

// Custom hook générique pour la gestion des formulaires
const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  const setFieldError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  return { values, errors, handleChange, reset, setFieldError, setValues };
};

export default useForm;
