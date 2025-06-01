import { Product, Customer, Sale, Supplier, User, DashboardSummary } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@clothstore.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    name: 'Store Manager',
    email: 'manager@clothstore.com',
    role: 'manager',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '3',
    name: 'Sales Staff',
    email: 'staff@clothstore.com',
    role: 'staff',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    description: 'Soft and comfortable premium cotton t-shirt, perfect for everyday wear.',
    category: 'Tops',
    subcategory: 'T-Shirts',
    sku: 'TS-001',
    price: 29.99,
    costPrice: 12.50,
    stockQuantity: 150,
    images: [
      'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/5698850/pexels-photo-5698850.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    material: '100% Cotton',
    brand: 'ClothBrand',
    createdAt: '2023-01-15T08:00:00Z',
    updatedAt: '2023-04-20T14:30:00Z',
    supplier: 'Cotton Suppliers Inc.'
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with stretch comfort technology.',
    category: 'Bottoms',
    subcategory: 'Jeans',
    sku: 'BJ-002',
    price: 59.99,
    costPrice: 25.00,
    stockQuantity: 85,
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Gray'],
    material: '98% Cotton, 2% Elastane',
    brand: 'DenimCo',
    createdAt: '2023-02-10T10:15:00Z',
    updatedAt: '2023-05-05T11:45:00Z',
    supplier: 'Fashion Denim Ltd.'
  },
  {
    id: '3',
    name: 'Wool Blend Sweater',
    description: 'Warm and stylish wool blend sweater for colder weather.',
    category: 'Tops',
    subcategory: 'Sweaters',
    sku: 'TS-003',
    price: 79.99,
    costPrice: 35.00,
    stockQuantity: 60,
    images: [
      'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/6347548/pexels-photo-6347548.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Gray', 'Burgundy'],
    material: '70% Wool, 30% Polyester',
    brand: 'CozyKnit',
    createdAt: '2023-03-05T09:30:00Z',
    updatedAt: '2023-06-12T15:20:00Z',
    supplier: 'Premium Woolens Co.'
  },
  {
    id: '4',
    name: 'Summer Floral Dress',
    description: 'Light and breezy floral print dress, perfect for summer days.',
    category: 'Dresses',
    subcategory: 'Casual',
    sku: 'WD-004',
    price: 49.99,
    costPrice: 22.00,
    stockQuantity: 75,
    images: [
      'https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/6765833/pexels-photo-6765833.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blue Floral', 'Pink Floral'],
    material: '100% Rayon',
    brand: 'SummerStyle',
    createdAt: '2023-04-20T11:45:00Z',
    updatedAt: '2023-07-08T16:35:00Z',
    supplier: 'Global Textiles Inc.'
  },
  {
    id: '5',
    name: 'Classic Oxford Shirt',
    description: 'Timeless oxford shirt suitable for both casual and semi-formal occasions.',
    category: 'Tops',
    subcategory: 'Shirts',
    sku: 'MS-005',
    price: 44.99,
    costPrice: 18.00,
    stockQuantity: 95,
    images: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/6764036/pexels-photo-6764036.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Pink', 'Gray'],
    material: '100% Cotton',
    brand: 'ClassicWear',
    createdAt: '2023-05-15T13:20:00Z',
    updatedAt: '2023-08-03T10:10:00Z',
    supplier: 'Cotton Suppliers Inc.'
  },
];

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.j@example.com',
    phone: '+1-555-123-4567',
    address: '123 Main St, Anytown, AN 12345',
    loyaltyPoints: 250,
    totalPurchases: 1250.75,
    createdAt: '2023-01-10T14:30:00Z',
    lastPurchase: '2023-04-15T11:20:00Z',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    phone: '+1-555-987-6543',
    address: '456 Oak Ave, Somewhere, SM 67890',
    loyaltyPoints: 180,
    totalPurchases: 875.50,
    createdAt: '2023-02-05T09:45:00Z',
    lastPurchase: '2023-05-20T13:15:00Z',
  },
  {
    id: '3',
    name: 'Sophia Rodriguez',
    email: 'sophia.r@example.com',
    phone: '+1-555-456-7890',
    address: '789 Elm Blvd, Elsewhere, EL 13579',
    loyaltyPoints: 320,
    totalPurchases: 1590.25,
    createdAt: '2023-03-12T16:20:00Z',
    lastPurchase: '2023-06-08T10:30:00Z',
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.w@example.com',
    phone: '+1-555-789-0123',
    address: '321 Pine St, Nowhere, NW 97531',
    loyaltyPoints: 90,
    totalPurchases: 450.00,
    createdAt: '2023-04-18T08:15:00Z',
    lastPurchase: '2023-05-05T15:45:00Z',
  },
  {
    id: '5',
    name: 'Olivia Kim',
    email: 'olivia.k@example.com',
    phone: '+1-555-234-5678',
    address: '654 Maple Dr, Anywhere, AW 24680',
    loyaltyPoints: 210,
    totalPurchases: 1050.80,
    createdAt: '2023-05-22T11:10:00Z',
    lastPurchase: '2023-06-19T12:40:00Z',
  },
];

export const sales: Sale[] = [
  {
    id: '1',
    products: [
      {
        productId: '1',
        productName: 'Premium Cotton T-Shirt',
        sku: 'TS-001',
        quantity: 2,
        price: 29.99,
        size: 'M',
        color: 'White'
      },
      {
        productId: '2',
        productName: 'Slim Fit Jeans',
        sku: 'BJ-002',
        quantity: 1,
        price: 59.99,
        size: '32',
        color: 'Blue'
      }
    ],
    customerId: '1',
    customerName: 'Emma Johnson',
    staffId: '3',
    staffName: 'Sales Staff',
    date: '2023-04-15T11:20:00Z',
    total: 119.97,
    tax: 10.00,
    subtotal: 109.97,
    paymentMethod: 'card',
    status: 'completed'
  },
  {
    id: '2',
    products: [
      {
        productId: '3',
        productName: 'Wool Blend Sweater',
        sku: 'TS-003',
        quantity: 1,
        price: 79.99,
        size: 'L',
        color: 'Gray'
      }
    ],
    customerId: '2',
    customerName: 'Michael Chen',
    staffId: '3',
    staffName: 'Sales Staff',
    date: '2023-05-20T13:15:00Z',
    total: 87.99,
    tax: 8.00,
    subtotal: 79.99,
    paymentMethod: 'cash',
    status: 'completed'
  },
  {
    id: '3',
    products: [
      {
        productId: '4',
        productName: 'Summer Floral Dress',
        sku: 'WD-004',
        quantity: 1,
        price: 49.99,
        size: 'S',
        color: 'Blue Floral'
      },
      {
        productId: '5',
        productName: 'Classic Oxford Shirt',
        sku: 'MS-005',
        quantity: 2,
        price: 44.99,
        size: 'M',
        color: 'White'
      }
    ],
    customerId: '3',
    customerName: 'Sophia Rodriguez',
    staffId: '2',
    staffName: 'Store Manager',
    date: '2023-06-08T10:30:00Z',
    total: 153.97,
    tax: 14.00,
    subtotal: 139.97,
    paymentMethod: 'card',
    status: 'completed'
  },
  {
    id: '4',
    products: [
      {
        productId: '2',
        productName: 'Slim Fit Jeans',
        sku: 'BJ-002',
        quantity: 1,
        price: 59.99,
        size: '34',
        color: 'Black'
      }
    ],
    customerId: '4',
    customerName: 'James Wilson',
    staffId: '3',
    staffName: 'Sales Staff',
    date: '2023-05-05T15:45:00Z',
    total: 65.99,
    tax: 6.00,
    subtotal: 59.99,
    paymentMethod: 'mobile',
    status: 'completed'
  },
  {
    id: '5',
    products: [
      {
        productId: '1',
        productName: 'Premium Cotton T-Shirt',
        sku: 'TS-001',
        quantity: 3,
        price: 29.99,
        size: 'L',
        color: 'Navy'
      },
      {
        productId: '3',
        productName: 'Wool Blend Sweater',
        sku: 'TS-003',
        quantity: 1,
        price: 79.99,
        size: 'M',
        color: 'Burgundy'
      }
    ],
    customerId: '5',
    customerName: 'Olivia Kim',
    staffId: '2',
    staffName: 'Store Manager',
    date: '2023-06-19T12:40:00Z',
    total: 199.96,
    tax: 18.00,
    subtotal: 181.96,
    discount: 10.00,
    paymentMethod: 'card',
    status: 'completed'
  },
];

export const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'Cotton Suppliers Inc.',
    contactPerson: 'David Miller',
    email: 'david@cottonsuppliers.com',
    phone: '+1-555-111-2222',
    address: '789 Textile Ave, Fabricville, FB 12345',
    products: ['1', '5'],
    lastOrder: '2023-03-10T09:00:00Z'
  },
  {
    id: '2',
    name: 'Fashion Denim Ltd.',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@fashiondenim.com',
    phone: '+1-555-333-4444',
    address: '456 Denim Way, Jeanton, JT 67890',
    products: ['2'],
    lastOrder: '2023-04-05T14:30:00Z'
  },
  {
    id: '3',
    name: 'Premium Woolens Co.',
    contactPerson: 'Robert Chang',
    email: 'robert@premiumwoolens.com',
    phone: '+1-555-555-6666',
    address: '123 Wool St, Knitville, KV 45678',
    products: ['3'],
    lastOrder: '2023-02-22T11:15:00Z'
  },
  {
    id: '4',
    name: 'Global Textiles Inc.',
    contactPerson: 'Maria Garcia',
    email: 'maria@globaltextiles.com',
    phone: '+1-555-777-8888',
    address: '321 Global Blvd, Textiletown, TT 98765',
    products: ['4'],
    lastOrder: '2023-05-15T10:45:00Z'
  }
];

export const generateMockDashboardData = (): DashboardSummary => {
  return {
    dailySales: 1245.80,
    weeklySales: 8750.50,
    monthlySales: 35250.75,
    lowStockItems: 3,
    topSellingProducts: [
      {
        productId: '1',
        name: 'Premium Cotton T-Shirt',
        quantity: 145,
        amount: 4348.55
      },
      {
        productId: '3',
        name: 'Wool Blend Sweater',
        quantity: 87,
        amount: 6959.13
      },
      {
        productId: '2',
        name: 'Slim Fit Jeans',
        quantity: 92,
        amount: 5519.08
      }
    ],
    recentSales: sales.slice(0, 3)
  };
};

export const generateId = (): string => {
  return uuidv4();
};