import NavBar from "./components/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import { useEffect, useState } from "react";
import { tryGetLoggedInUser } from "./managers/authManagers";
import { LoadingSpinner } from "./components/Loading/LoadingPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    // user will be null if not authenticated
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);
console.log("App.jsx: loggedInUser", loggedInUser);
  // wait to get a definite logged-in state before rendering
  if (loggedInUser === undefined) {
    return <LoadingSpinner/>
  }

  return (
    <>
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <ApplicationViews
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
    </>
  );
}

export default App;
