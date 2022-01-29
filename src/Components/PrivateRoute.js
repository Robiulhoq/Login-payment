import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { LoggedInContex } from "../App";

function PrivateRoute({ children, ...rest }) {
  const [loginUser, setLoginUser] = useContext(LoggedInContex)
    return (
      <Route
        {...rest}
        render={({ location }) =>
        loginUser.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  export default PrivateRoute