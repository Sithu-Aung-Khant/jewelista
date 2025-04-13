import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FooterSectionProps {
  title: string;
  children: ReactNode;
}

export const FooterColumn = ({ title, children }: FooterSectionProps) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
  >
    <h3 className='font-semibold text-dark-brown font-dm-sans text-sm tracking-wide mb-4'>
      {title}
    </h3>
    <div className='space-y-2 w-full flex flex-col text-sm font-dm-sans'>
      {children}
    </div>
    <div className='h-px mt-3 md:hidden bg-border-brown'></div>
  </motion.div>
);
