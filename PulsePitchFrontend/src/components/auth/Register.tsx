// @ts-nocheck
import { useState } from "react";
import { register } from "../../managers/authManagers";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export default function Register({ setLoggedInUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [imageLocation, setImageLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    const newUser = {
      firstName,
      lastName,
      userName,
      email,
      password,
      imageLocation: imageLocation || null,
    };

    register(newUser).then((user) => {
      if (user.errors) {
        setErrors(user.errors);
      } else {
        setLoggedInUser(user);
        navigate("/");
      }
    });
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <h3 className="text-2xl font-semibold mb-6 text-center">Sign Up</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="User Name"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          label="Image URL"
          type="text"
          value={imageLocation}
          onChange={(e) => setImageLocation(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPasswordMismatch(false);
            setPassword(e.target.value);
          }}
          error={passwordMismatch ? "Passwords do not match!" : ""}
        />
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setPasswordMismatch(false);
            setConfirmPassword(e.target.value);
          }}
          error={passwordMismatch ? "Passwords do not match!" : ""}
        />
        {errors.map((e, i) => (
          <p key={i} className="text-danger-600 text-sm">
            {e}
          </p>
        ))}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={passwordMismatch}
        >
          Register
        </Button>
      </form>
      <p className="text-center mt-4 text-sm">
        Already signed up?{" "}
        <Link to="/login" className="text-primary-600 hover:underline">
          Log in here
        </Link>
      </p>
    </Card>
  );
}