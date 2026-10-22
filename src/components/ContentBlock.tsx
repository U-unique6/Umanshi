import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type ContentBlockProps = {
  children: ReactNode
  className?: string
}

export function ContentBlock({ children, className }: ContentBlockProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 42 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
