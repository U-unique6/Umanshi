import { strings } from '../utils/strings.js'
import { ContentBlock } from './ContentBlock'
import { SectionHeading } from './SectionHeading'

export function Contact() {
  return (
    <section className="border-t border-[#713a32]/55 bg-[#100908]/82 py-[75px] backdrop-blur-sm md:py-[102px]" id="contact">
      <ContentBlock className="mx-auto flex w-full max-w-[1224px] flex-col items-start px-5 md:px-8">
        <SectionHeading number="07" label={strings.contact.eyebrow} title={strings.contact.heading} emphasis={strings.contact.emphasis} />
        <p className="mt-[17px] max-w-[510px] text-[13px] leading-[1.8] text-[#cbbab3] md:text-sm">{strings.contact.introduction}</p>
        <a className="mt-[22px] inline-flex items-center gap-3 border-b border-[#8e493e] pb-1.5 text-[clamp(15px,4vw,19px)] font-medium text-[#f5ece7] transition hover:border-[#ef745a] hover:text-[#ef745a] md:text-[22px]" href="mailto:umanshilodhi023@gmail.com">
          umanshilodhi023@gmail.com <span className="text-[15px] text-[#ef745a]">↗</span>
        </a>
        <a className="mt-4 inline-flex items-center gap-3 border-b border-[#8e493e] pb-1.5 text-[clamp(15px,4vw,19px)] font-medium text-[#f5ece7] transition hover:border-[#ef745a] hover:text-[#ef745a] md:text-[22px]" href="tel:+918368922162">
          +91 83689 22162 <span className="text-[15px] text-[#ef745a]">↗</span>
        </a>
        <div className="mt-8 flex flex-wrap gap-6 text-[10px] font-medium">
          <a className="text-[#cbbab3] transition hover:text-[#ef745a]" href="https://www.linkedin.com/in/umanshi23" target="_blank" rel="noreferrer">{strings.contact.linkedIn} ↗</a>
          <a className="text-[#cbbab3] transition hover:text-[#ef745a]" href="https://github.com/U-unique6" target="_blank" rel="noreferrer">{strings.contact.github} ↗</a>
          <a className="text-[#cbbab3] transition hover:text-[#ef745a]" href="/Umanshi_Resume.pdf" download>{strings.contact.resume} ↓</a>
        </div>
      </ContentBlock>
    </section>
  )
}
