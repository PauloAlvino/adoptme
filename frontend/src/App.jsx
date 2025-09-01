import {
  Route,
  BrowserRouter as Router,
  Navigate,
  Routes,
} from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Navbar from "./components/layouts/Navbar";
import Container from "./components/Container";
import AuthContainer from "./components/AuthContainer";
import Footer from "./components/layouts/Footer";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <AuthContainer>
              <Home />
            </AuthContainer>
          }
        />
        <Route
          path="/login"
          element={
            <AuthContainer>
              <Login />
            </AuthContainer>
          }
        />
        <Route
          path="/register"
          element={
            <AuthContainer>
              <Register />
            </AuthContainer>
          }
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
