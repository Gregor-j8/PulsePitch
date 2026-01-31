import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../managers/authManagers";
import { AuthCard } from "./AuthCard";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { UserProfileDTO } from "../../types";

interface LoginProps {
  setLoggedInUser: (user: UserProfileDTO | null) => void;
}

export default function Login({ setLoggedInUser }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [failedLogin, setFailedLogin] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <AuthCard title="Login">
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
      <p className="text-sm text-center text-neutral-600">
        Not signed up?{" "}
        <Link to="/register" className="text-primary-600 hover:underline font-medium">
          Register here
        </Link>
      </p>
    </AuthCard>
  );
}