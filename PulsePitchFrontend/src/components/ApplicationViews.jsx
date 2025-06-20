import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoutes";
import Login from "./auth/Login";
import Register from "./auth/Register";
import App from "../App";
import VideoUploader from "./SoccerVideo/SoccerVideo";
import { Home } from "../Home/Home";
import MyCalendar from "./Calendar/Calendar";
import { TeamHome } from "./TeamHome/TeamHome";
import { Profile } from "./Profile/Profile";
import {TacticalView} from "./TacticalView/TacticalView";

export default function ApplicationViews({loggedInUser, setLoggedInUser, refreshLoggedInUser}) {
  
  return (
    <Routes>
      <Route
        index
        element={
          <AuthorizedRoute loggedInUser={loggedInUser} roles={["Player", "Coach"]}>
            <MyCalendar loggedInUser={loggedInUser} refreshLoggedInUser={refreshLoggedInUser}/>
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
        path="home"
        element={
           <AuthorizedRoute loggedInUser={loggedInUser}>
               <Home loggedInUser={loggedInUser}/>
           </AuthorizedRoute>
      }
      />
      <Route
        path="team"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
              <TeamHome loggedInUser={loggedInUser} />
           </AuthorizedRoute>
      }
      />
      <Route
        path="pitch"
        element={
              <TacticalView loggedInUser={loggedInUser} />
      }
      />
      <Route
        path={`profile/:id`}
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
              <Profile loggedInUser={loggedInUser} />
           </AuthorizedRoute>
      }
      />
      <Route
        path="video"
        element={ <AuthorizedRoute loggedInUser={loggedInUser} roles={"Coach"}><VideoUploader/></AuthorizedRoute>}
      />

      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
