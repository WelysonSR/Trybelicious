import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enabled, setEnabled] = useState(true);

  const validateEmail = (verify) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(verify);
  };

  useEffect(() => {
    const number = 5;
    if (validateEmail(email) && password.length > number) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  }, [email, password]);

  const handleEnterClick = () => {
    history.push('/foods');
  };

  return (
    <div>
      <input
        data-testid="email-input"
        name="email"
        value={ email }
        type="email"
        placeholder="Email"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        data-testid="password-input"
        name="password"
        value={ password }
        type="password"
        placeholder="Senha"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        onClick={ handleEnterClick }
        disabled={ enabled }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
