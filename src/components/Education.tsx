import { education } from '../utils/portfolioData'
import { strings } from '../utils/strings.js'
import { ContentBlock } from './ContentBlock'
import { SectionHeading } from './SectionHeading'

export function Education() {
  return (
    <section className="mx-auto w-full max-w-[1224px] px-5 py-[75px] md:px-8 md:py-[102px]" id="education">
      <ContentBlock className="flex flex-col items-start justify-between gap-[15px] md:flex-row md:items-end md:gap-11">
        <SectionHeading number="03" label={strings.education.eyebrow} title={strings.education.heading} emphasis={strings.education.emphasis} />
        <p className="mb-1 max-w-[350px] text-[13px] leading-[1.8] text-[#cbbab3]">{strings.education.introduction}</p>
      </ContentBlock>
      <div className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3">
        {education.map((item, index) => (
          <ContentBlock key={item.qualification}>
            <article className="relative h-full overflow-hidden rounded-xl border border-[#633b35]/70 bg-[#160d0c]/65 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#a64a3a] md:p-6">
              <span aria-hidden="true" className="absolute -top-6 -right-2 text-[96px] leading-none font-semibold tracking-[-0.08em] text-[#ef745a]/[0.12]">
                0{index + 1}
              </span>
              <p className="relative m-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ef745a]">{item.period}</p>
              <h3 className="relative mt-8 mb-0 max-w-[270px] text-xl leading-snug font-semibold tracking-[-0.035em] text-[#f5ece7]">
                {item.qualification}
              </h3>
              <p className="relative mt-3 mb-0 text-[13px] leading-relaxed text-[#cbbab3]">{item.institution}</p>
              <div className="relative mt-6 border-t border-[#593a35] pt-4">
                <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#bda8a1]">{strings.education.percentage}</span>
                <p className="mt-1 mb-0 text-sm font-medium text-[#f5ece7]">{item.result}</p>
              </div>
            </article>
          </ContentBlock>
        ))}
      </div>
    </section>
  )
}
