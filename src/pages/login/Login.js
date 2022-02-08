import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import GlobalContext from '../../context/GlobalContext';
import './Login.css';
import person from './person.svg';
import lock from './lock.svg';

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
    <div className="login-form">
      <div className="elements">
        <h1 className="login">LOGIN</h1>
        <div>
          <img src={ person } alt="person" className="icon-person" />
          <Input
            testid="email-input"
            type="email"
            placeholder="Email"
            name={ email }
            onChange={ handleEmail }
            value={ email }
          />
        </div>
        <div>
          <img src={ lock } alt="person" className="icon-person" />
          <Input
            testid="password-input"
            type="password"
            placeholder="Password"
            name={ password }
            onChange={ handlePassword }
            value={ password }
          />
        </div>
        <div className="button-enter">
          <Button
            type="button"
            label="ENTER"
            testid="login-submit-btn"
            className={ `${buttonLogin.disabledButt}` }
            onClick={ () => {
              handleClick();
              history.push('/foods');
            } }
            disabled={ buttonLogin.disabledButt }
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
