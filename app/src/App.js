import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import SearchResults from './pages/SearchResults';
import Delivery from "./pages/DeliveryPage";
import OrderSummaryPage from "./pages/Summary";
import Admin from "./pages/Admin";
import PaymentSuccess from "./pages/Succes";
import PaymentFailure from "./pages/Failure";
import Terms from './pages/Terms';
import AboutUs from "./pages/AboutUs";
import CustomerService from  "./pages/CustomerService"
import PrivacyPolicy from  "./pages/PrivacyPolicy"
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product/:productId" element={<ProductPage />} />
                    <Route path="/category/:categoryId" element={<CategoryPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/delivery" element={<Delivery />} />
                    <Route path="/summary" element={<OrderSummaryPage />} />
                    <Route path="/success" element={<PaymentSuccess />} />
                    <Route path="/cancel" element={<PaymentFailure />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/aboutas" element={<AboutUs />} />
                    <Route path="/customerservice" element={<CustomerService />} />
                    <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                    <Route path="/admin" element={
                        <ProtectedRoute requiredUserType="ADMIN">
                            <Admin />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
