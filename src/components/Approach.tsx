import { principles } from '../utils/portfolioData'
import { strings } from '../utils/strings.js'
import { ContentBlock } from './ContentBlock'
import { SectionHeading } from './SectionHeading'

export function Approach() {
  return (
    <section className="border-y border-[#552d2a]/35 bg-[#180d0c]/45 py-[75px] backdrop-blur-[2px] md:py-[102px]" id="approach">
      <div className="mx-auto w-full max-w-[1224px] px-5 md:px-8">
        <ContentBlock className="flex flex-col items-start justify-between gap-[15px] md:flex-row md:items-end md:gap-11">
          <SectionHeading number="06" label={strings.approach.eyebrow} title={strings.approach.heading} emphasis={strings.approach.emphasis} />
          <p className="mb-1 max-w-[350px] text-[13px] leading-[1.8] text-[#cbbab3]">{strings.approach.introduction}</p>
        </ContentBlock>
        <div className="mt-[29px] border-t border-[#593a35] md:mt-12">
          {principles.map((principle) => (
            <ContentBlock key={principle.number}>
              <article className="group grid grid-cols-[31px_1fr_16px] gap-2.5 border-b border-[#593a35] py-[19px] md:grid-cols-[56px_minmax(190px,0.8fr)_minmax(0,1.2fr)_20px] md:gap-6 md:py-[22px]">
                <span className="pt-1 text-[11px] text-[#ef745a]">{principle.number}</span>
                <h3 className="m-0 text-sm leading-[1.55] font-semibold text-[#f5ece7] md:text-base">{principle.title}</h3>
                <p className="col-[2] m-0 text-xs leading-[1.75] text-[#cbbab3] md:col-auto md:text-[13px]">{principle.description}</p>
                <span className="col-[3] row-[1] text-sm text-[#a58c84] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ef745a] md:col-auto md:row-auto">↗</span>
              </article>
            </ContentBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
