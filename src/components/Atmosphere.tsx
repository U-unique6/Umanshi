import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

export function Atmosphere() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.72, 1, 0.66])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#090707]">
      <motion.div
        className="absolute -inset-[18%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(116,31,23,0.34),transparent_42%),radial-gradient(ellipse_at_88%_45%,rgba(81,22,20,0.24),transparent_38%),radial-gradient(ellipse_at_15%_76%,rgba(62,17,22,0.28),transparent_39%),linear-gradient(180deg,#100a09_0%,#090707_48%,#100908_100%)]"
        style={reduceMotion ? undefined : { y, opacity }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,4,0.7),transparent_45%,rgba(5,4,4,0.48)),linear-gradient(0deg,rgba(7,5,5,0.72),transparent_35%,rgba(7,5,5,0.36))]" />
      <div className="absolute top-[12%] left-[8%] h-40 w-40 rounded-full bg-[#7d2016]/10 blur-[90px]" />
      <div className="absolute top-[51%] right-[4%] h-56 w-56 rounded-full bg-[#861e18]/10 blur-[110px]" />
      {!reduceMotion && (
        <motion.div
          className="absolute bottom-[-18%] left-[42%] h-[58%] w-[2px] origin-bottom rotate-[22deg] bg-gradient-to-t from-[#a43727]/0 via-[#a43727]/15 to-transparent blur-[2px]"
          animate={{ opacity: [0.2, 0.55, 0.25], scaleY: [0.92, 1.08, 0.96] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <div className="absolute inset-0 opacity-[0.045] [background-image:radial-gradient(rgba(255,228,210,0.7)_0.55px,transparent_0.55px)] [background-size:5px_5px]" />
    </div>
  )
}
