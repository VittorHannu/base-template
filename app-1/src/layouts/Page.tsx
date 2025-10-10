import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '@/lib/animations';

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

export const Page = ({ children, className }: PageProps) => {
  return (
    <motion.div
      className={`fixed inset-0 z-50 bg-background pt-16 overflow-y-auto ${className}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};
