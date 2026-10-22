import { experience } from '../utils/portfolioData'
import { strings } from '../utils/strings.js'
import { ContentBlock } from './ContentBlock'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section className="mx-auto w-full max-w-[1224px] px-5 py-[75px] md:px-8 md:py-[102px]" id="experience">
      <ContentBlock className="flex flex-col items-start justify-between gap-[15px] md:flex-row md:items-end md:gap-11">
        <SectionHeading number="01" label={strings.experience.eyebrow} title={strings.experience.heading} emphasis={strings.experience.emphasis} />
        <p className="mb-1 max-w-[350px] text-[13px] leading-[1.8] text-[#cbbab3]">{strings.experience.introduction}</p>
      </ContentBlock>
      <div className="mt-[29px] border-t border-[#593a35] md:mt-12">
        {experience.map((job) => (
          <ContentBlock key={job.company}>
            <article className="grid grid-cols-1 gap-2.5 border-b border-[#593a35] py-5 md:grid-cols-[135px_minmax(170px,0.8fr)_minmax(0,1.2fr)] md:gap-[18px] md:py-6 xl:grid-cols-[170px_minmax(200px,0.8fr)_minmax(0,1.2fr)] xl:gap-7">
              <p className="m-0 text-[10px] font-medium text-[#ef745a]">{job.period}</p>
              <div>
                <h3 className="m-0 text-[17px] font-semibold text-[#f5ece7]">{job.role}</h3>
                <p className="mt-1.5 mb-0 text-[11px] leading-[1.65] text-[#cbbab3]">{job.company} <span className="text-[#ef745a]">·</span> {job.location}</p>
              </div>
              <ul className="m-0 list-none p-0">
                {job.highlights.map((highlight) => (
                  <li className="relative mb-[7px] pl-[14px] text-[11px] leading-[1.65] text-[#cbbab3] before:absolute before:top-[0.65em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-[#ef745a] before:content-['']" key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          </ContentBlock>
        ))}
      </div>
    </section>
  )
}
