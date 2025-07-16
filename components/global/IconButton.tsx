import Image, { StaticImageData } from 'next/image';

export interface IconButtonProps {
  icon: string | StaticImageData;
  alt: string;
  title: string;
  ariaLabel: string;
  className?: string;
  onClick?: () => void;
}

export const IconButton = ({
  icon,
  alt,
  title,
  ariaLabel,
  className = '',
  onClick,
}: IconButtonProps) => (
  <button
    type='button'
    title={title}
    aria-label={ariaLabel}
    onClick={onClick}
    className='hover:opacity-80 transition-opacity'
  >
    <Image src={icon} alt={alt} className={className} width={20} height={20} />
  </button>
);
