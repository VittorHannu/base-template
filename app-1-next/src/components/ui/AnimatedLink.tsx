'use client';

import { Link } from 'next-view-transitions';
import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

interface AnimatedLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedLink = ({ children, className, ...props }: AnimatedLinkProps) => {
  const handleClick = () => {
    document.documentElement.dataset.direction = 'forward';
  };

  return (
    <Link {...props} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};
