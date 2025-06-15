import NavBar from "./components/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import {useAuth} from "./Context/LoggedInUserContext"

function App() {
  const { loggedInUser } = useAuth();
 if (loggedInUser === undefined) {
    return null
  }

  return (
    <>
      <NavBar/>
      <ApplicationViews
      />
    </>
  )
}

export default App;
