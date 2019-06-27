import { useState } from 'react';

export const useForm = callback => {
  const [inputs, setInputs] = useState({});
  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      callback(inputs);
    }
  };
  const handleInputChange = (event, checked) => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: checked || event.target.value,
    }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};
