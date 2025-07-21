import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import FoodCard from '@/components/FoodCard';
import CategoryFilter from '@/components/CategoryFilter';
import OrderModal from '@/components/OrderModal';
import Footer from '@/components/Footer';
import { foodItems } from '@/data/foodItems';

const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(foodItems.map(item => item.category)));
  }, []);

  const filteredItems = useMemo(() => {
    if (!selectedCategory) return foodItems;
    return foodItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Our Menu
          </h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No items found in this category.
            </p>
          </div>
        )}
      </main>

      <OrderModal />
      <Footer />
    </div>
  );
};

export default MenuPage;