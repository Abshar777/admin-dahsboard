import { NavItem } from '@/types';



//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Category',
    url: '#',
    icon: 'category',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [
      {
        title: 'Create category',
        url: '/admin/category/create',
        shortcut: ['p', 'p'],
        isActive: false,
      },
      {
        title: 'Category List',
        url: '/admin/category',
        shortcut: ['p', 'p'],
        isActive: false,
      },
    ] // No child items
  },
  {
    title: 'Brand',
    url: '#',
    icon: 'brand',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [
      {
        title: 'Create brand',
        url: '/admin/brand/create',
        shortcut: ['p', 'p'],
        isActive: false,
      },
      {
        title: 'Brand List',
        url: '/admin/brand',
        shortcut: ['p', 'p'],
        isActive: false,
      },
    ] // No child items
  },
  {
    title: 'Orders',
    url: '/admin/orders',
    icon: 'order',
    shortcut: ['p', 'p'],
    isActive: false,
   
  },
  {
    title: 'Product',
    url: '#',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [
      {
        title: 'Create Product',
        url: '/admin/product/create',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
      },
      {
        title: 'Product List',
        url: '/admin/product',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
      },
    ] // No child items
  },
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'billing',
  //   isActive: true,

  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/admin/profile',
  //       icon: 'userPen',
  //       shortcut: ['m', 'm']
  //     },
  //     {
  //       title: 'Login',
  //       shortcut: ['l', 'l'],
  //       url: '/',
  //       icon: 'login'
  //     }
  //   ]
  // },
  {
    title: 'Kanban',
    url: '/admin/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  }
];





export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];





