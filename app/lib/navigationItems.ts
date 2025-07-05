export type NavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  subcategories?: {
    label: string;
    href: string;
  }[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'JEWELRY',
    href: '/jewelry',
    hasDropdown: true,
    subcategories: [
      { label: 'All', href: '/jewelry' },
      { label: 'Necklaces', href: '/jewelry/necklaces' },
      { label: 'Rings', href: '/jewelry/rings' },
      { label: 'Earrings', href: '/jewelry/earrings' },
      { label: 'Bracelets', href: '/jewelry/bracelets' },
    ],
  },
  {
    label: 'LOVE AND ENGAGEMENT',
    href: '/love-and-engagement',
    hasDropdown: true,
    subcategories: [
      { label: 'All', href: '/love-and-engagement' }, 
      {
        label: 'Engagement Rings',
        href: '/love-and-engagement/engagement-rings',
      },
      { label: 'Wedding Rings', href: '/love-and-engagement/wedding-rings' },
    ],
  },

  // { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT US', href: '/contact' },
];
