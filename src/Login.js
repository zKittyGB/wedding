import React, { useState } from "react";
import "./css/Login.css";
import App from "./App";

function Login() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    // Logique de connexion (par exemple, vérifier les informations d'identification)
    setIsLogged(true);
  };

  return (
    <div className="loginContainer">
      {isLogged ? (
        <App isLogged={isLogged} />
      ) : (
        <div className="loginPage">
          <h2>Login</h2>
          {/* Formulaire de connexion ou autre méthode pour se connecter */}
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;
