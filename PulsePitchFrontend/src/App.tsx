import NavBar from "./components/Navbar";
import ApplicationViews from "./components/ApplicationViews";
import { useEffect, useState } from "react";
import { tryGetLoggedInUser } from "./managers/authManagers";
import { LoadingSpinner } from "./components/LoadingPage";
import { UserProfileDTO } from "./types";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserProfileDTO | null | undefined>(undefined);

  useEffect(() => {
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);

  if (loggedInUser === undefined) {
    return <LoadingSpinner/>
  }

  const refreshLoggedInUser = async (): Promise<void> => {
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
