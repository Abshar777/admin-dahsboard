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
      {
        title: 'Sub-Catgory ',
        url: '/admin/category/sub',
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
    items:[
      {
        title: 'Returned Orders',
        url: '/admin/orders/returndOrders',
        icon: 'order',
        shortcut: ['p', 'p'],
        isActive: false,
      },
    ]
  },
  {
    title: 'Service',
    url: '/admin/service',
    icon: 'service',
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
  {
    title: 'Banner',
    url: '#',
    icon: 'kanban',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [
      {
        title: 'Create Banner',
        url: '/admin/banner/create',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
      },
      {
        title: 'Banner List',
        url: '/admin/banner',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
      },
    ] // No child items
  },
  {
    title: 'Home Page Sections',
    url: '#',
    icon: 'section',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [
      {
        title: 'Create section',
        url: '/admin/section/create',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
      },
      {
        title: 'Section List',
        url: '/admin/section',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
      },
    ] // No child items
  },
  {
    title: 'chat',
    url: '/admin/chat',
    icon: 'chat',
    shortcut: ['p', 'p'],
    isActive: false,
   
  },
    
];






