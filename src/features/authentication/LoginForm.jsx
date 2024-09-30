import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

import { useLogin } from "./useLogin";

function LoginForm() {
  const navigate = useNavigate();
  const { login, isLogingIn } = useLogin();

  const [email, setEmail] = useState("asmaa@gmail.com");
  const [password, setPassword] = useState("1234");

  function handleSubmit(e) {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => navigate("/"),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogingIn}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogingIn}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLogingIn} size="large">
          {isLogingIn ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
