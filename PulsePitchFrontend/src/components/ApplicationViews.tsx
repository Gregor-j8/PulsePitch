import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoutes";
import Login from "./auth/Login";
import Register from "./auth/Register";
import VideoUploader from "./SoccerVideo/SoccerVideo";
import { Home } from "../Home/Home";
import MyCalendar from "./Calendar/Calendar";
import { TeamHome } from "./TeamHome/TeamHome";
import { Profile } from "./Profile/Profile";
import {TacticalView} from "./TacticalView/TacticalView";
import { Inbox } from "./Inbox/Inbox";
import Layout from "./Layout/Layout";
import { LoggedInUserProps } from "../types";
import { Dashboard } from "./Dashboard";
import { BrowseTeams } from "./Teams/BrowseTeams";

export default function ApplicationViews({loggedInUser, setLoggedInUser, refreshLoggedInUser}: LoggedInUserProps) {
  
  return (
    <Routes>
      <Route
        index
        element={
          <AuthorizedRoute loggedInUser={loggedInUser} roles={["Player", "Coach"]}>
            <Layout variant="default">
              <Dashboard loggedInUser={loggedInUser!} refreshLoggedInUser={refreshLoggedInUser}/>
            </Layout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="calendar"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser} roles={["Player", "Coach"]}>
            <Layout variant="default">
              <MyCalendar loggedInUser={loggedInUser!} refreshLoggedInUser={refreshLoggedInUser}/>
            </Layout>
          </AuthorizedRoute>
        }
      />
      <Route
        path="login"
        element={
          <Layout variant="centered">
            <Login setLoggedInUser={setLoggedInUser} />
          </Layout>
        }
      />

      <Route
        path="register"
        element={
          <Layout variant="centered">
            <Register setLoggedInUser={setLoggedInUser} />
          </Layout>
        }
      />
      <Route
        path="home"
        element={
           <AuthorizedRoute loggedInUser={loggedInUser}>
             <Layout variant="centered">
               <Home loggedInUser={loggedInUser}/>
             </Layout>
           </AuthorizedRoute>
      }
      />
      <Route
        path="team"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <Layout variant="default">
              <TeamHome loggedInUser={loggedInUser} />
            </Layout>
           </AuthorizedRoute>
      }
      />
      <Route
        path="pitch"
        element={
          <AuthorizedRoute loggedInUser={loggedInUser} roles={["Coach"]}>
            <Layout variant="full-width">
              <TacticalView loggedInUser={loggedInUser!} />
            </Layout>
          </AuthorizedRoute>
      }
      />
      <Route
        path={`profile/:id`}
        element={
          <AuthorizedRoute loggedInUser={loggedInUser}>
            <Layout variant="centered">
              <Profile loggedInUser={loggedInUser} />
            </Layout>
           </AuthorizedRoute>
      }
      />
      <Route
        path="video"
        element={
        <AuthorizedRoute loggedInUser={loggedInUser} roles={["Coach"]}>
          <Layout variant="default">
            <VideoUploader/>
          </Layout>
         </AuthorizedRoute>}
        />
      <Route
        path="inbox"
        element={
        <AuthorizedRoute loggedInUser={loggedInUser} >
          <Layout variant="default">
            <Inbox loggedInUser={loggedInUser!}/>
          </Layout>
        </AuthorizedRoute>}
        />
      <Route
        path="browse-teams"
        element={
        <AuthorizedRoute loggedInUser={loggedInUser} roles={["Player", "Coach"]}>
          <Layout variant="default">
            <BrowseTeams loggedInUser={loggedInUser!}/>
          </Layout>
        </AuthorizedRoute>}
        />
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
