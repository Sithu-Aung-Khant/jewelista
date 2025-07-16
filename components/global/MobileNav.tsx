'use client';

import { NAV_ITEMS } from '@/app/lib/navigationItems';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-white z-50'
        >
          <div className='flex justify-end p-4'>
            <button
              onClick={onClose}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
              aria-label='Close menu'
            >
              <X className='h-6 w-6' />
            </button>
          </div>

          <nav className='px-6 py-4'>
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className='border-b border-gray-100'>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className='flex items-center justify-between w-full py-4 text-lg'
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          openDropdowns[item.label] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: openDropdowns[item.label] ? 'auto' : 0,
                        opacity: openDropdowns[item.label] ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className='overflow-hidden'
                    >
                      <div className='pl-4 pb-4'>
                        {item.subcategories?.map((subcategory) => (
                          <Link
                            key={subcategory.label}
                            href={subcategory.href}
                            onClick={onClose}
                            className='block py-2 text-gray-600 hover:text-primary transition-colors'
                          >
                            {subcategory.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className='block py-4 text-lg hover:text-primary transition-colors'
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
