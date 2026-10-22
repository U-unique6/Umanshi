import { skillGroups } from '../utils/portfolioData'
import { strings } from '../utils/strings.js'
import { ContentBlock } from './ContentBlock'
import { SectionHeading } from './SectionHeading'

export function Skills() {
  return (
    <section className="mx-auto w-full max-w-[1224px] px-5 py-[75px] md:px-8 md:py-[102px]" id="skills">
      <ContentBlock className="flex flex-col items-start justify-between gap-[15px] md:flex-row md:items-end md:gap-11">
        <SectionHeading number="02" label={strings.skills.eyebrow} title={strings.skills.heading} emphasis={strings.skills.emphasis} />
        <p className="mb-1 max-w-[350px] text-[13px] leading-[1.8] text-[#cbbab3]">{strings.skills.introduction}</p>
      </ContentBlock>
      <div className="mt-[27px] grid grid-cols-1 gap-2.5 md:mt-11 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group) => (
          <ContentBlock key={group.number}>
            <article className="h-full min-h-0 rounded-[7px] border border-[#633b35]/70 bg-[#160d0c]/35 p-[19px] transition hover:-translate-y-0.5 hover:border-[#a64a3a] hover:shadow-[0_8px_22px_rgba(141,44,31,0.16)] md:min-h-[260px] md:p-[23px]">
              <span className="text-[11px] text-[#ef745a]">{group.number}</span>
              <h3 className="mt-[11px] mb-[5px] text-[19px] font-semibold tracking-[-0.025em] text-[#f5ece7] md:mt-[17px]">{group.title}</h3>
              <p className="m-0 text-xs leading-[1.65] text-[#cbbab3]">{group.description}</p>
              <ul className="mt-[14px] mb-0 flex list-none flex-wrap gap-[7px] p-0 md:mt-[18px]">
                {group.tools.map((tool) => (
                  <li className="rounded border border-[#5b3732]/70 bg-[#241513]/75 px-[9px] py-1.5 text-[10px] text-[#ddc9c0]" key={tool}>{tool}</li>
                ))}
              </ul>
            </article>
          </ContentBlock>
        ))}
      </div>
    </section>
  )
}
