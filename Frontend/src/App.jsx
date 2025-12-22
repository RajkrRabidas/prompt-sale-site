import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import { AuthProvider } from './context/AuthContext.jsx'
import AdminLogin from './admin/pages/Login.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import AdminDashboard from './admin/pages/Dashboard.jsx'
import Orders from './admin/pages/Orders.jsx'
import SuccessPage from './pages/SucessPage.jsx'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment/webhook" element={<SuccessPage />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App
