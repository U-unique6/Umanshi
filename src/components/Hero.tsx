import { useState, type PointerEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { strings } from '../utils/strings.js'

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null)
  const heading = strings.hero.heading
  const fullHeading = heading.join(' ')

  const revealImage = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    setPointer({ x: event.clientX - bounds.left, y: event.clientY - bounds.top })
  }

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh_-_76px)] w-full items-center overflow-hidden border-b border-[#713a32]/45 bg-[#090707] px-5 py-[67px] pb-[84px] md:px-8 md:py-[76px] md:pb-[100px]"
      id="home"
      onPointerMove={revealImage}
      onPointerLeave={() => setPointer(null)}
    >
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/vecna-background.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[58%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,6,7,0.84)_0%,rgba(7,6,7,0.64)_40%,rgba(7,6,7,0.2)_100%),linear-gradient(0deg,rgba(7,6,7,0.62)_0%,transparent_36%,rgba(7,6,7,0.22)_100%)]" />
        <img
          src="/vecna-portrait.png"
          alt=""
          className="absolute top-1/2 left-1/2 h-auto w-[100svh] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-90 object-cover"
          style={{
            opacity: pointer ? 1 : 0,
            maskImage: pointer
              ? `radial-gradient(circle 190px at ${pointer.x}px ${pointer.y}px, black 0%, rgba(0,0,0,0.86) 44%, transparent 100%)`
              : 'none',
            WebkitMaskImage: pointer
              ? `radial-gradient(circle 190px at ${pointer.x}px ${pointer.y}px, black 0%, rgba(0,0,0,0.86) 44%, transparent 100%)`
              : 'none',
          }}
        />
        <div className="absolute inset-0 opacity-[0.045] [background-image:radial-gradient(rgba(255,228,210,0.7)_0.55px,transparent_0.55px)] [background-size:5px_5px]" />
      </div>

      <div className="mx-auto w-full max-w-[1440px]">
        <motion.div
          className="relative z-10 mx-auto w-full text-center"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="m-0 flex items-center justify-center gap-2.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#cbbab3] md:text-[11px]">
            <span className="h-2 w-2 rounded-full bg-[#e55a3d] shadow-[0_0_12px_rgba(229,90,61,0.8)]" />
            {strings.hero.role}
          </p>
          <h1
            aria-label={fullHeading}
            className="my-[23px] w-full text-[clamp(42px,8.2vw,116px)] leading-[1.02] font-semibold tracking-[-0.06em] text-[#f5ece7] md:my-[34px] md:leading-[1.06]"
          >
            {heading.map((line, index) => {
              const lineStart = heading.slice(0, index).reduce((total, value) => total + value.length + 1, 0)

              return (
                <span className="block min-h-[1.04em]" key={line}>
                  {Array.from(line).map((character, characterIndex) => (
                    <motion.span
                      aria-hidden="true"
                      className={`inline-block ${index === heading.length - 1 ? 'text-[#ef745a] [text-shadow:0_0_24px_rgba(239,116,90,0.4)]' : ''}`}
                      initial={reduceMotion ? false : { opacity: 0, y: '0.16em', filter: 'blur(5px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.32,
                        delay: reduceMotion ? 0 : (lineStart + characterIndex) * 0.032,
                        ease: 'easeOut',
                      }}
                      key={`${lineStart + characterIndex}-${character}`}
                    >
                      {character === ' ' ? '\u00a0' : character}
                    </motion.span>
                  ))}
                  {index === heading.length - 1 && (
                    <motion.span
                      aria-hidden="true"
                      className="ml-[0.08em] inline-block h-[0.78em] w-[0.045em] translate-y-[0.06em] bg-[#ff765b] shadow-[0_0_16px_rgba(255,118,91,0.85)]"
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 0.15, 1] }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.82, repeat: Infinity, ease: 'easeInOut', delay: fullHeading.length * 0.032 }
                      }
                    />
                  )}
                </span>
              )
            })}
          </h1>
          <motion.p
            className="mx-auto max-w-[690px] text-[14px] leading-[1.8] text-[#d8c7c0] md:text-base"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: reduceMotion ? 0 : fullHeading.length * 0.032 }}
          >
            {strings.hero.introduction}
          </motion.p>
          <div className="mt-[22px] flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:mt-7">
            <a className="inline-flex min-h-[42px] items-center justify-center gap-[13px] rounded-[5px] border border-[#bd4935] bg-[#a93427] px-[15px] text-[11px] font-medium text-white transition hover:-translate-y-px hover:border-[#e55a3d] hover:bg-[#bd4935] md:min-h-11 md:text-xs" href="#experience">
              {strings.hero.workLink} <span className="text-[15px]">↓</span>
            </a>
            <a className="inline-flex min-h-[42px] items-center gap-[13px] px-0 text-[11px] font-medium text-[#f5ece7] transition hover:text-[#ef745a] md:min-h-11 md:text-xs" href="/Umanshi_Resume.pdf" download>
              {strings.hero.resumeLink} <span className="text-[15px]">↗</span>
            </a>
          </div>
        </motion.div>
      </div>

      <a className="absolute bottom-[25px] left-5 z-10 inline-flex items-center gap-2.5 text-[11px] text-[#cbbab3] no-underline transition hover:text-[#f5ece7] md:left-8" href="#about">
        {strings.hero.scrollLink} <span className="text-[#ef745a]">↓</span>
      </a>
    </section>
  )
}
