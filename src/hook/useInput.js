// useForm.js
import { useState } from "react";

const useInput = (initialState) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const reset = () => {
    setValues(initialState);
  };

  const resetField = (fieldName, value) => {
    setValues({
      ...values,
      [fieldName]: value,
    });
  };

  return {
    values,
    onChange,
    reset,
    resetField,
  };
};

export default useInput;
