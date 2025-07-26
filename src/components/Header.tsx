import React from 'react';
import { MapPin, Clock, Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocationService } from '@/hooks/useLocationService';
import { useAdmin } from '@/context/AdminContext';
import zaykaLogo from '@/assets/zaykaa-logo.png';

const Header: React.FC = () => {
  const { serviceArea } = useLocationService();
  const { isAdmin, openLoginModal, logout } = useAdmin();

  return (
    <header className="bg-gradient-primary text-white shadow-lg">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* Top-Left Logo */}
          <div className="flex items-center gap-4">
            <img 
              src={zaykaLogo} 
              alt="Zaykaa Logo" 
              className="w-12 h-12 rounded-2xl shadow-lg"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Zaykaa</h1>
              <p className="text-white/90 text-sm">Delicious food delivered to your doorstep</p>
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="h-3 w-3" />
                <span>Delivering to: {serviceArea}</span>
              </div>
            </div>
          </div>

          {/* Top-Right Admin Button and Info */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>30-45 mins delivery</span>
            </div>
            
            {isAdmin ? (
              <Button
                size="sm"
                variant="destructive"
                onClick={logout}
                className="text-sm font-semibold"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            ) : (
              // Only show admin login in development mode
              import.meta.env.DEV && (
                <Button
                  size="sm"
                  onClick={openLoginModal}
                  className="text-sm font-semibold uppercase bg-white/20 hover:bg-white/30 border border-white/20 rounded-lg px-4 py-2 transition-all duration-200"
                >
                  <Shield className="h-4 w-4 mr-1" />
                  Admin Login
                </Button>
              )
            )}
          </div>
        </div>
        
        {/* Mobile delivery time */}
        <div className="md:hidden flex items-center gap-2 text-sm mt-2">
          <Clock className="h-4 w-4" />
          <span>30-45 mins delivery</span>
        </div>
      </div>
    </header>
  );
};

export default Header;