import React from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

function Login() {
  return (
    <div>
      <h1>LOGIN</h1>
      <Input
        testid="email-input"
        type="email"
        placeholder="Email"
        name="email"
        // onChange={ onChange }
        value="E-mail"
      />
      <Input
        testid="password-input"
        type="password"
        placeholder="Password"
        name="password"
        // onChange={ onChange }
        value="password"
      />
      <Button
        type="button"
        label="ENTER"
        testid="login-submit-btn"
        // onClick={ onClick }
      />
    </div>
  );
}

export default Login;
