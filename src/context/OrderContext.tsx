import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FoodItem, OrderItem } from '@/types/food';

interface OrderContextType {
  selectedItem: FoodItem | null;
  setSelectedItem: (item: FoodItem | null) => void;
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  orderItems: OrderItem[];
  addToOrder: (item: FoodItem, quantity: number) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addToOrder = (item: FoodItem, quantity: number) => {
    const orderItem: OrderItem = { ...item, quantity };
    setOrderItems(prev => [...prev, orderItem]);
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  return (
    <OrderContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
        isOrderModalOpen,
        setIsOrderModalOpen,
        orderItems,
        addToOrder,
        clearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};