import React from 'react';
import { MapPin, Clock, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocationService } from '@/hooks/useLocationService';
import { useAdmin } from '@/context/AdminContext';
import zaykaaLogo from '@/assets/zaykaa-logo.png';

const Header: React.FC = () => {
  const { serviceArea } = useLocationService();
  const { isAdmin, openLoginModal, logout } = useAdmin();

  return (
    <header className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        {/* Top Row: Logo and Admin Button */}
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={zaykaaLogo} 
              alt="Zaykaa Logo" 
              className="w-12 h-12 md:w-12 md:h-12 rounded-2xl shadow-md object-contain bg-white/10 p-1"
            />
          </div>
          
          {/* Admin Login Button */}
          <div className="flex items-center">
            {isAdmin ? (
              <button
                onClick={logout}
                className="text-sm font-semibold uppercase bg-white/20 hover:bg-white/30 border border-white/30 hover:border-white/50 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              // Only show admin login in development mode
              import.meta.env.DEV && (
                <button
                  onClick={openLoginModal}
                  className="text-sm font-semibold uppercase bg-white/20 hover:bg-white/30 border border-white/30 hover:border-white/50 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </button>
              )
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">Zaykaa</h1>
            </div>
            <p className="text-white/90 text-lg">Delicious food delivered to your doorstep</p>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">Delivering to: {serviceArea}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>30-45 mins delivery</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;