import type { Transition } from 'framer-motion';

export const pageVariants = {
  initial: { x: '100%' },
  animate: { x: '0%' },
  exit: { x: '100%' },
};

export const pageTransition: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.4,
};
