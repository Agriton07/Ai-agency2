import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * FadeUp — wraps children with a scroll-triggered fade + slide-up entrance.
 * @param {number} delay  - stagger delay in seconds
 * @param {number} amount - % of element visible before triggering (0–1)
 */
export default function FadeUp({ children, delay = 0, amount = 0.15, style, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
