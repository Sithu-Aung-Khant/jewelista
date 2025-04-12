import React from 'react';
import Image, { StaticImageData } from 'next/image';

type IconButtonProps = {
  icon: string | StaticImageData;
  alt: string;
  title: string;
  ariaLabel: string;
  className?: string;
};

export const IconButton = ({
  icon,
  alt,
  title,
  ariaLabel,
  className,
}: IconButtonProps) => (
  <button
    className="hover:opacity-80 transition-opacity"
    title={title}
    aria-label={ariaLabel}
  >
    <Image src={icon} className={className} width={20} height={20} alt={alt} />
  </button>
);
