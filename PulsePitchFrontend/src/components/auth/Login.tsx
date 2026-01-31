// @ts-nocheck
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../managers/authManagers";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export default function Login({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then((user) => {
      if (!user) {
        setFailedLogin(true);
      } else {
        setLoggedInUser(user);
        navigate("/");
      }
    });
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <h3 className="text-2xl font-semibold mb-6 text-center">Login</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="text"
          value={email}
          onChange={(e) => {
            setFailedLogin(false);
            setEmail(e.target.value);
          }}
          error={failedLogin ? "Login failed. Please check your credentials." : ""}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setFailedLogin(false);
            setPassword(e.target.value);
          }}
          error={failedLogin ? " " : ""}
        />
        <Button type="submit" variant="primary" fullWidth>
          Login
        </Button>
      </form>
      <p className="mt-4 text-sm text-center">
        Not signed up?{" "}
        <Link to="/register" className="text-primary-600 hover:underline">
          Register here
        </Link>
      </p>
    </Card>
  );
}