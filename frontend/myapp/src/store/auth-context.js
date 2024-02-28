import React from "react";
const AuthContext = React.createContext({
  token: "",
  login: (t) => {},
  logout: () => {},
});

export default AuthContext;
