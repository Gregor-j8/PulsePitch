import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoutes";
import Login from "./auth/Login";
import Register from "./auth/Register";
import App from "../App";
import VideoUploader from "./SoccerVideo/SoccerVideo";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route
        index
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <VideoUploader/>
          </AuthorizedRoute>
        }
      />
      <Route
        path="login"
        element={<Login setLoggedInUser={setLoggedInUser} />}
      />

      <Route
        path="register"
        element={<Register setLoggedInUser={setLoggedInUser} />}
      />

      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
