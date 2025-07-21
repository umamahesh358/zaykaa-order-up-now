import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Zaykaa</h1>
            <p className="text-white/90 text-lg">Delicious food delivered to your doorstep</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Delhi NCR</span>
            </div>
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