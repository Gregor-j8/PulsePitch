import NavBar from "./components/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import { useEffect, useState } from "react";
import { tryGetLoggedInUser } from "./managers/authManagers";
import { LoadingSpinner } from "./components/Loading/LoadingPage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);
  if (loggedInUser === undefined) {
    return <LoadingSpinner/>
  }

  const refreshLoggedInUser = async () => {
  const user = await tryGetLoggedInUser();
  setLoggedInUser(user);
};

  return (
    <>
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <ApplicationViews
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        refreshLoggedInUser={refreshLoggedInUser}
        />
    </>
  );
}

export default App;
