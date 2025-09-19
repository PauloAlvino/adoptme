import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Navbar from "./components/layouts/Navbar";
import Container from "./components/Container";
import AuthContainer from "./components/AuthContainer";
import Footer from "./components/layouts/Footer";
import { UserProvider } from "./context/UserContext";
import Message from "./components/layouts/Message";
import Profile from "./components/pages/user/Profile";
import Dashboard from "./components/pages/pet/Dashboard";
import AddPet from "./components/pages/pet/AddPet";
import EditPet from "./components/pages/pet/EditPet";
import PetDetails from "./components/pages/pet/PetDetails";
import MyAdoptions from "./components/pages/MyAdoptions";
function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Routes>
          <Route
            path="/"
            element={
              <Container>
                <Home />
              </Container>
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
          <Route
            path="/user/profile"
            element={
              <Container>
                <Profile />
              </Container>
            }
          />
          <Route
            path="/pet/mypets"
            element={
              <Container>
                <Dashboard />
              </Container>
            }
          />
          <Route
            path="/pet/add"
            element={
              <Container>
                <AddPet />
              </Container>
            }
          />
          <Route
            path="/pet/edit/:id"
            element={
              <Container>
                <EditPet />
              </Container>
            }
          />
          <Route
            path="/pet/:id"
            element={
              <Container>
                <PetDetails />
              </Container>
            }
          />
          <Route
            path="/pet/myadoptions"
            element={
              <Container>
                <MyAdoptions />
              </Container>
            }
          />
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
