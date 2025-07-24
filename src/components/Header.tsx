import React from 'react';
import { MapPin, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocationService } from '@/hooks/useLocationService';
import { useAdminMode } from '@/hooks/useAdminMode';

const Header: React.FC = () => {
  const { serviceArea } = useLocationService();
  const { isAdmin, toggleAdminMode } = useAdminMode();

  return (
    <header className="bg-gradient-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">Zaykaa</h1>
              <Button
                size="sm"
                variant={isAdmin ? "destructive" : "secondary"}
                onClick={toggleAdminMode}
                className="hidden md:flex"
              >
                <Shield className="h-4 w-4 mr-1" />
                {isAdmin ? "Exit Admin" : "Admin"}
              </Button>
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
            <Button
              size="sm"
              variant={isAdmin ? "destructive" : "secondary"}
              onClick={toggleAdminMode}
              className="md:hidden"
            >
              <Shield className="h-4 w-4 mr-1" />
              {isAdmin ? "Exit Admin" : "Admin"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;