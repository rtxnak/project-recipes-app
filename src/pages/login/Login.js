import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import GlobalContext from '../../context/GlobalContext';

function Login() {
  const history = useHistory();
  const {
    handleEmail,
    email,
    handlePassword,
    password,
    buttonLogin,
    handleClick,
  } = useContext(GlobalContext);
  return (
    <div>
      <h1>LOGIN</h1>
      <Input
        testid="email-input"
        type="email"
        placeholder="Email"
        name={ email }
        onChange={ handleEmail }
        value={ email }
      />
      <Input
        testid="password-input"
        type="password"
        placeholder="Password"
        name={ password }
        onChange={ handlePassword }
        value={ password }
      />
      <Button
        type="button"
        label="ENTER"
        testid="login-submit-btn"
        onClick={ () => {
          handleClick();
          history.push('/foods');
        } }
        disabled={ buttonLogin.disabledButt }
      />
    </div>
  );
}

export default Login;
