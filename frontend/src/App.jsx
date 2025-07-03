import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    
    <AuthProvider>
      <BrowserRouter>
        
        <main>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />  
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />         
          </Routes>
        </main>   
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover={false}        
          draggable        
        />           
      </BrowserRouter>
      </AuthProvider>
    
  );
}

export default App;