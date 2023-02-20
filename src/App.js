import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register";
import VerifyEmail from "./VerifyEmail";
import Login from "./Login";
import { useState, useEffect } from "react";
import { AuthProvider } from "./AuthContext";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./PrivateRoute";
import { Navigate } from "react-router-dom";
import Dashboard from "./Admin/Pages/Dashboard";
import Sidebar from "./Admin/Sidebar";
import Home from "./Admin/Pages/Home";
import About from "./Admin/Pages/About";
import Setting from "./Admin/Pages/Setting";
import Contact from "./Admin/Pages/Contact";
import Products from "./Admin/Pages/Products";
import Certification from "./Admin/Pages/Certification";
import SociallyResponsive from "./Admin/Pages/SociallyResponsive";
import ProductForm from "./Admin/Pages/ProductForm";
import CertificationForm from "./Admin/Pages/CertificationForm";
import SociallyForm from "./Admin/Pages/SociallyForm";
import ContactForm from "./Admin/Pages/ContactForm";
import AddData from "./Admin/dashboardData/AddData";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <Router>
      {/* <Routes>
        <Route exact path="/" element={<Dashboard /> } />
        <Route exact path="/dashboard" element={<Dashboard /> } />
        <Route exact path="/home" element={<Home /> } />
        <Route exact path="/about" element={<About /> } />
        <Route exact path="/products" element={<Products /> } />
        <Route exact path="/certification" element={<Certification /> } />
        <Route exact path="/socially-responsive" element={<SociallyResponsive /> } />
        <Route exact path="/contact" element={<Contact /> } />
        <Route exact path="/setting" element={<Setting /> } />
      </Routes> */}
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Dashboard />
                </Sidebar>
              </PrivateRoute>
            }
          />
                 <Route
            exact
            path="/data-form/:id"
            element={
              <PrivateRoute>
                <Sidebar>
                  <AddData />
                </Sidebar>
              </PrivateRoute>
            }
          />
           <Route
            exact
            path="/add-data"
            element={
              <PrivateRoute>
                <Sidebar>
                <AddData />
                </Sidebar>
              </PrivateRoute>
            }
          />
          
          <Route
            exact
            path="/home"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Home />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/about"
            element={
              <PrivateRoute>
                <Sidebar>
                  <About />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/product-form/:id"
            element={
              <PrivateRoute>
                <Sidebar>
                  <ProductForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/products"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Products />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/certification"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Certification />
                </Sidebar>
              </PrivateRoute>
            }
          />
            <Route
            exact
            path="/certification-form/:id"
            element={
              <PrivateRoute>
                <Sidebar>
                  <CertificationForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/socially-responsive"
            element={
              <PrivateRoute>
                <Sidebar>
                  <SociallyResponsive />
                </Sidebar>
              </PrivateRoute>
            }
          />
             <Route
            exact
            path="/socially-form/:id"
            element={
              <PrivateRoute>
                <Sidebar>
                  <SociallyForm />
                </Sidebar>
              </PrivateRoute>
            }
          />
           <Route
            exact
            path="/contact"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Contact />
                </Sidebar>
              </PrivateRoute>
            }
          />
            <Route
            exact
            path="/contact-form/:id"
            element={
              <PrivateRoute>
                <Sidebar>
                  <ContactForm />
                </Sidebar>
              </PrivateRoute>
            }
          />          
          <Route
            exact
            path="/setting"
            element={
              <PrivateRoute>
                <Sidebar>
                  <Setting />
                </Sidebar>
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              !currentUser?.emailVerified ? (
                <Login />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/register"
            element={
              !currentUser?.emailVerified ? (
                <Register />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
export default App;
