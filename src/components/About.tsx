import { strings } from '../utils/strings.js'
import { ContentBlock } from './ContentBlock'
import { SectionHeading } from './SectionHeading'

export function About() {
  return (
    <section className="mx-auto w-full max-w-[1224px] px-5 py-[75px] md:px-8 md:py-[102px]" id="about">
      <ContentBlock>
        <SectionHeading number="05" label={strings.about.eyebrow} title={strings.about.heading} emphasis={strings.about.emphasis} />
      </ContentBlock>
      <div className="mt-7 grid grid-cols-1 items-start gap-6 md:mt-[38px] md:grid-cols-[minmax(0,1.3fr)_minmax(250px,0.7fr)] md:gap-[12%]">
        <ContentBlock className="max-w-[650px]">
          <p className="mb-[17px] text-base leading-[1.65] text-[#f5ece7] md:text-lg">{strings.about.lead}</p>
          {strings.about.paragraphs.map((paragraph) => (
            <p className="mb-[17px] text-[13px] leading-[1.85] text-[#cbbab3] md:text-sm" key={paragraph}>{paragraph}</p>
          ))}
          <a className="mt-[5px] inline-flex items-center gap-2.5 text-[11px] font-semibold text-[#f5ece7] no-underline transition hover:text-[#ef745a]" href="https://www.linkedin.com/in/umanshi23" target="_blank" rel="noreferrer">
            {strings.about.linkedIn} <span className="text-[15px]">↗</span>
          </a>
        </ContentBlock>
        <ContentBlock className="border-l-2 border-[#a63a2c] py-5 pl-[22px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#bda8a1]">{strings.about.outsideLabel}</p>
          <p className="mt-1.5 mb-4 text-[13px] leading-[1.75] text-[#cbbab3]">{strings.about.outside}</p>
          <div className="my-[18px] h-px bg-[#593a35]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#bda8a1]">{strings.about.locationLabel}</p>
          <p className="mt-1.5 text-[13px] leading-[1.75] text-[#cbbab3]">{strings.about.location}</p>
        </ContentBlock>
      </div>
    </section>
  )
}
