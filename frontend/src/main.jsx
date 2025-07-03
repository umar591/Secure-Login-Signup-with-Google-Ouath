import React from "react";
import ReactDOM from "react-dom/client";

import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext.jsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.error("❌ Google Client ID is missing in environment variables");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>   
      <AuthProvider>             
            <App />   
      </AuthProvider>             
    </React.StrictMode>
  </GoogleOAuthProvider>
);
