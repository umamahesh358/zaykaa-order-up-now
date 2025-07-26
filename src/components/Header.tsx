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
    <header className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-lg">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* Top-Left Logo */}
          <div className="flex items-center gap-4">
            <img 
              src={zaykaLogo} 
              alt="Zaykaa Logo" 
              className="w-12 h-12 md:w-12 md:h-12 rounded-2xl shadow-md object-cover" 
            />
            <div className="hidden md:block">
              <h1 className="text-2xl md:text-3xl font-bold">Zaykaa</h1>
              <p className="text-white/90 text-sm">Delicious food delivered to your doorstep</p>
            </div>
          </div>

          {/* Center Content for Mobile */}
          <div className="md:hidden text-center">
            <h1 className="text-xl font-bold">Zaykaa</h1>
            <p className="text-white/90 text-xs">Delicious food delivered</p>
          </div>

          {/* Top-Right Admin Login */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>Delivering to: {serviceArea}</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>30-45 mins</span>
            </div>
            
            {isAdmin ? (
              <Button
                size="sm"
                variant="destructive"
                onClick={logout}
                className="text-xs font-semibold uppercase px-3 py-2 rounded-lg"
              >
                <LogOut className="h-3 w-3 mr-1" />
                Logout
              </Button>
            ) : (
              // Only show admin login in development mode
              import.meta.env.DEV && (
                <Button
                  onClick={openLoginModal}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 text-xs font-semibold uppercase px-3 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Admin Login
                </Button>
              )
            )}
          </div>
        </div>

        {/* Mobile Info Row */}
        <div className="md:hidden mt-3 flex justify-center gap-6 text-xs text-white/90">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{serviceArea}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>30-45 mins</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;