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
      { label: 'Necklaces', href: '/jewelry/necklaces' },
      { label: 'Rings', href: '/jewelry/rings' },
      { label: 'Earrings', href: '/jewelry/earrings' },
      { label: 'Bracelets', href: '/jewelry/bracelets' },
      { label: 'Watches', href: '/jewelry/watches' },
    ],
  },
  {
    label: 'LOVE AND ENGAGEMENT',
    href: '/love-and-engagement',
    hasDropdown: true,
    subcategories: [
      {
        label: 'Engagement Rings',
        href: '/love-and-engagement/engagement-rings',
      },
      { label: 'Wedding Bands', href: '/love-and-engagement/wedding-bands' },
      { label: 'Bridal Sets', href: '/love-and-engagement/bridal-sets' },
      {
        label: 'Anniversary Rings',
        href: '/love-and-engagement/anniversary-rings',
      },
    ],
  },
  {
    label: 'GIFTS',
    href: '/gifts',
    hasDropdown: true,
    subcategories: [
      { label: 'Birthday', href: '/gifts/birthday' },
      { label: 'Anniversary', href: '/gifts/anniversary' },
      { label: "Valentine's Day", href: '/gifts/valentines-day' },
      { label: 'Special Occasions', href: '/gifts/special-occasions' },
    ],
  },
  { label: 'CUSTOM JEWELRY', href: '/custom-jewelry' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT US', href: '/contact' },
];
