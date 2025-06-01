import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  User, 
  Product, 
  Customer, 
  Sale, 
  Supplier,
  DashboardSummary
} from '../types';
import { 
  users, 
  products as mockProducts, 
  customers as mockCustomers, 
  sales as mockSales, 
  suppliers as mockSuppliers,
  generateMockDashboardData,
  generateId 
} from '../data/mockData';

interface AppContextType {
  // Auth
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  
  // Sales
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
  updateSale: (id: string, sale: Partial<Sale>) => void;
  deleteSale: (id: string) => void;
  
  // Suppliers
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;

  // Dashboard
  dashboardData: DashboardSummary;
  refreshDashboard: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [dashboardData, setDashboardData] = useState<DashboardSummary>(generateMockDashboardData());

  // Auto-login the first user for demonstration purposes
  useEffect(() => {
    setCurrentUser(users[0]);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, we would validate against a backend
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts(prev => 
      prev.map(p => p.id === id ? { ...p, ...product, updatedAt: new Date().toISOString() } : p)
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addCustomer = (customer: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const updateCustomer = (id: string, customer: Partial<Customer>) => {
    setCustomers(prev => 
      prev.map(c => c.id === id ? { ...c, ...customer } : c)
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const addSale = (sale: Omit<Sale, 'id' | 'date'>) => {
    const newSale: Sale = {
      ...sale,
      id: generateId(),
      date: new Date().toISOString(),
    };
    setSales(prev => [...prev, newSale]);
    
    // Update product quantities
    sale.products.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        updateProduct(item.productId, {
          stockQuantity: product.stockQuantity - item.quantity
        });
      }
    });
    
    // Update customer data if present
    if (sale.customerId) {
      const customer = customers.find(c => c.id === sale.customerId);
      if (customer) {
        updateCustomer(sale.customerId, {
          totalPurchases: customer.totalPurchases + sale.total,
          lastPurchase: new Date().toISOString()
        });
      }
    }
    
    refreshDashboard();
  };

  const updateSale = (id: string, sale: Partial<Sale>) => {
    setSales(prev => 
      prev.map(s => s.id === id ? { ...s, ...sale } : s)
    );
  };

  const deleteSale = (id: string) => {
    setSales(prev => prev.filter(s => s.id !== id));
  };

  const addSupplier = (supplier: Omit<Supplier, 'id'>) => {
    const newSupplier: Supplier = {
      ...supplier,
      id: generateId(),
    };
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const updateSupplier = (id: string, supplier: Partial<Supplier>) => {
    setSuppliers(prev => 
      prev.map(s => s.id === id ? { ...s, ...supplier } : s)
    );
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
  };

  const refreshDashboard = () => {
    setDashboardData(generateMockDashboardData());
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        sales,
        addSale,
        updateSale,
        deleteSale,
        suppliers,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        dashboardData,
        refreshDashboard
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};