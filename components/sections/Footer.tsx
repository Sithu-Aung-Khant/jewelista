'use client';

import { motion } from 'framer-motion';
import { FooterColumn } from '../footer/FooterColumn';
import { FooterLink } from '../footer/FooterLink';
import { footerLinks } from '../../app/lib/footerLinks';
import { TermsAndConditions } from '../global/TermsAndConditions';
import { KeepInTouch } from '../footer/KeepInTouch';

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Footer() {
  return (
    <footer className='bg-footer pt-16 pb-8 px-4 md:px-8'>
      <motion.div
        className='max-w-7xl mx-auto'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div
          className='grid grid-cols-1 md:grid-cols-4 md:gap-8 gap-4 mb-12'
          variants={staggerContainer}
        >
          {footerLinks.map((section) => (
            <FooterColumn key={section.title} title={section.title}>
              {section.links.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.text}
                </FooterLink>
              ))}
            </FooterColumn>
          ))}
          <KeepInTouch />
        </motion.div>
        <TermsAndConditions />
      </motion.div>
    </footer>
  );
}
