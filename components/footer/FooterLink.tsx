import Link from 'next/link';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

export const FooterLink = ({ href, children }: FooterLinkProps) => (
  <Link
    href={href}
    className='text-light-brown hover:text-deep-blue transition-colors'
  >
    {children}
  </Link>
);
