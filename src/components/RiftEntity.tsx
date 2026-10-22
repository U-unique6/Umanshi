import { useReducedMotion } from 'motion/react'
import { strings } from '../utils/strings.js'
import { RiftScene3D } from './RiftScene3D'

export function RiftEntity() {
  const reduceMotion = useReducedMotion()

  return (
    <section aria-labelledby="rift-heading" className="relative isolate overflow-hidden border-y border-[#713a32]/55 bg-[#100908]/78 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_74%_52%,rgba(143,41,30,0.2),transparent_44%),radial-gradient(ellipse_at_13%_35%,rgba(112,36,31,0.13),transparent_34%)]" />
      <div className="relative mx-auto grid w-full max-w-[1224px] items-center gap-6 px-5 py-14 md:grid-cols-[0.8fr_1.2fr] md:gap-8 md:px-8 md:py-16">
        <div className="relative z-10 max-w-[390px]">
          <p className="m-0 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#cbbab3] md:text-[11px]">
            <span className={`h-2 w-2 rounded-full bg-[#e55a3d] ${reduceMotion ? '' : 'animate-pulse shadow-[0_0_12px_rgba(229,90,61,0.5)]'}`} />
            {strings.rift.eyebrow}
          </p>
          <h2 id="rift-heading" className="mt-5 mb-0 text-[clamp(40px,7vw,72px)] leading-[0.98] font-semibold tracking-[-0.055em] text-[#f5ece7]">
            {strings.rift.heading[0]}
            <br />
            <span className="text-[#ef745a] [text-shadow:0_0_26px_rgba(239,116,90,0.2)]">{strings.rift.heading[1]}</span>
          </h2>
          <p className="mt-5 max-w-[360px] text-[14px] leading-[1.85] text-[#cbbab3]">
            {strings.rift.introduction}
          </p>
          <a
            className="mt-7 inline-flex min-h-11 items-center gap-3 rounded-[7px] border border-[#633b35] bg-[#1b100e]/80 px-4 text-xs font-medium text-[#f2e8e3] shadow-sm transition hover:border-[#ef745a] hover:bg-[#241210] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef745a]"
            href="#skills"
          >
            {strings.rift.link}
            <span aria-hidden="true" className="text-[#ef745a]">↓</span>
          </a>
        </div>

        <div className="relative mx-auto aspect-[560/500] w-full max-w-[670px]">
          <RiftScene3D />
          <div className="pointer-events-none absolute right-[8%] bottom-[8%] rounded-full border border-[#633b35]/80 bg-[#100b0a]/75 px-3 py-2 font-mono text-[8px] tracking-[0.12em] text-[#cbbab3] shadow-sm backdrop-blur-sm">
            <span className="text-[#ef745a]">{strings.rift.status}</span>
            <span className="mx-2 text-[#8f6b62]">/</span>
            {strings.rift.coordinates}
          </div>
        </div>
      </div>
    </section>
  )
}
