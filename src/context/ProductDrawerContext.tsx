import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface ProductDrawerContextType {
  isOpen: boolean;
  toggleOpen: () => void;
  toggleClose:()=>void;
}

// Create the context with default values
const ProductDrawerContext = createContext<ProductDrawerContextType | undefined>(undefined);

// Create a provider component
export const ProductDrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(true);
  const toggleClose = () => setIsOpen(false);


  return (
    <ProductDrawerContext.Provider value={{ isOpen, toggleOpen,toggleClose}}>
      {children}
    </ProductDrawerContext.Provider>
  );
};

// Custom hook to use the ProductDrawerContext
export const useProductDrawer = () => {
  const context = useContext(ProductDrawerContext);
  if (context === undefined) {
    throw new Error('useProductDrawer must be used within a ProductDrawerProvider');
  }
  return context;
};
