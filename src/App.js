import { createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Login from "./Components/Login";
import Payment from "./Components/Payment";
import PrivateRoute from "./Components/PrivateRoute";
export const LoggedInContex = createContext();
function App() {
  const [loginUser, setLoginUser] = useState({
    email: ''
 
  });
  console.log(loginUser);
  return (
   <LoggedInContex.Provider  value={[loginUser, setLoginUser]}>
      <Router>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <PrivateRoute path='/payment'>
          <Payment/>
        </PrivateRoute>
      </Switch>
    </Router>
   </LoggedInContex.Provider>
  );
}

export default App;
