import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import authService from "fbase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    });
    setInit(true);
  }, []);

  return <>
    {init ? <AppRouter isLoggedIn={isLoggedIn}/>  : "Loading..."}
    <footer>&copy; {new Date().getFullYear()} ToDoSNS</footer>
  </>
}

export default App;