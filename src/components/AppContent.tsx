import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LockScreen } from "@/components/LockScreen";
import { PrivateAdminRoute } from "@/components/PrivateAdminRoute";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import Index from "../pages/Index";
import MenuPage from "../pages/MenuPage";
import AdminPage from "../pages/AdminPage";
import NotFound from "../pages/NotFound";

export const AppContent: React.FC = () => {
  const { isAuthenticated, authenticate } = useAuth();

  if (!isAuthenticated) {
    return <LockScreen onAuthenticated={authenticate} />;
  }

  return (
    <>
      <AdminLoginModal />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route 
          path="/admin" 
          element={
            <PrivateAdminRoute>
              <AdminPage />
            </PrivateAdminRoute>
          } 
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};