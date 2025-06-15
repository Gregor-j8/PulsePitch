import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoutes";
import Login from "./auth/Login";
import Register from "./auth/Register";
import App from "../App";
import VideoUploader from "./SoccerVideo/SoccerVideo";
import { Home } from "../Home/Home";
import MyCalendar from "./Calendar/Calendar";
import { useAuth } from "../Context/LoggedInUserContext";

export default function ApplicationViews() {
    const { loggedInUser, setLoggedInUser } = useAuth();
  
  return (
    <Routes>
      <Route
        index
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <Home loggedInUser={loggedInUser}/>
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
      <Route
        path="main"
        element={
           <AuthorizedRoute loggedInUser={loggedInUser}>
              <MyCalendar  />
           </AuthorizedRoute>
      }
      />
      <Route
        path="video"
        element={ <AuthorizedRoute loggedInUser={loggedInUser}><VideoUploader/></AuthorizedRoute>}
      />

      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
