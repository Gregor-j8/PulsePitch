import { useState } from "react";
import { register } from "../../managers/authManagers";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-center">Sign Up</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">User Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={imageLocation}
            onChange={(e) => setImageLocation(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            className={`w-full border rounded px-3 py-2 ${passwordMismatch ? "border-red-500" : "border-gray-300"}`}
            value={password}
            onChange={(e) => {
              setPasswordMismatch(false);
              setPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            className={`w-full border rounded px-3 py-2 ${passwordMismatch ? "border-red-500" : "border-gray-300"}`}
            value={confirmPassword}
            onChange={(e) => {
              setPasswordMismatch(false);
              setConfirmPassword(e.target.value);
            }}
          />
          {passwordMismatch && (
            <p className="text-red-600 text-sm mt-1">Passwords do not match!</p>
          )}
        </div>
        {errors.map((e, i) => (
          <p key={i} className="text-red-600 text-sm">
            {e}
          </p>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          disabled={passwordMismatch}
        >
          Register
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        Already signed up?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Log in here
        </Link>
      </p>
    </div>
  );
}