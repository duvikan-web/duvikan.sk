import React from 'react';
import { motion } from 'framer-motion';

// eslint-disable-next-line  react/prop-types
export const ScaleUp = ({ children }) => (
  <motion.div
    initial={{ scale: 0.25, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.2, delay: 0, ease: 'linear' }}
    exit={{ x: '100%' }}
  >
    {children}
  </motion.div>
);
