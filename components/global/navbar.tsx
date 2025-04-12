import React from 'react';
import Announcement from './announcement';
import Navigation from './Navigation';

const Navbar = () => {
  return (
    <header className='w-full bg-white'>
      <Announcement />
      <Navigation />
    </header>
  );
};

export default Navbar;
