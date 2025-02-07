import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import { getToken } from "./services/authService";
import "bootstrap/dist/css/bootstrap.min.css";

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  return getToken() ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create" element={<PrivateRoute element={<ProductForm />} />} />
          <Route path="/edit/:id" element={<PrivateRoute element={<ProductForm />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
