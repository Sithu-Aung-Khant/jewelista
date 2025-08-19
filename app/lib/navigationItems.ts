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
    href: '/jewelry/all',
    hasDropdown: true,
    subcategories: [
      // { label: 'All', href: '/jewelry/all' },
      { label: 'Necklaces', href: '/jewelry/necklaces' },
      { label: 'Rings', href: '/jewelry/rings' },
      { label: 'Earrings', href: '/jewelry/earrings' },
      { label: 'Bracelets', href: '/jewelry/bracelets' },
    ],
  },
  {
    label: 'WEDDING AND ENGAGEMENT',
    href: '/wedding-and-engagement/all',
    hasDropdown: true,
    subcategories: [
      // { label: 'All', href: '/wedding-and-engagement/all' },
      {
        label: 'Engagement Rings',
        href: '/wedding-and-engagement/engagement-rings',
      },
      { label: 'Wedding Rings', href: '/wedding-and-engagement/wedding-rings' },
    ],
  },

  { label: 'CONTACT US', href: '/contact' },
];
