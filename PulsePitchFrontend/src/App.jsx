import { useEffect, useState } from "react";
import { tryGetLoggedInUser } from "./managers/authManagers";
import NavBar from "./components/NavBar";
import ApplicationViews from "./components/ApplicationViews";


function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user); // Will be null if unauthenticated
    });
  }, []);

 if (loggedInUser === undefined) {
    return null
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
