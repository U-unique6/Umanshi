import { achievements } from '../utils/portfolioData'
import { strings } from '../utils/strings.js'
import { AchievementScene3D } from './AchievementScene3D'
import { ContentBlock } from './ContentBlock'
import { SectionHeading } from './SectionHeading'

export function Achievements() {
  return (
    <section aria-labelledby="achievements-heading" className="overflow-hidden border-y border-[#552d2a]/35 bg-[#180d0c]/45 py-[75px] backdrop-blur-[2px] md:py-[102px]" id="achievements">
      <div className="mx-auto grid w-full max-w-[1224px] items-center gap-6 px-5 md:grid-cols-[1.05fr_0.95fr] md:gap-9 md:px-8">
        <div className="relative z-[1]">
          <ContentBlock>
            <SectionHeading
              number="04"
              label={strings.achievements.eyebrow}
              title={strings.achievements.heading}
              emphasis={strings.achievements.emphasis}
              className="[&_h2]:text-[clamp(38px,5vw,54px)]"
            />
            <p className="mt-4 max-w-[440px] text-[13px] leading-[1.8] text-[#cbbab3]">{strings.achievements.introduction}</p>
          </ContentBlock>
          <div className="mt-7">
            {achievements.map((achievement) => (
              <ContentBlock key={achievement.number}>
                <article className="group grid grid-cols-[38px_1fr] gap-3 border-t border-[#593a35] py-[18px] transition-colors hover:border-[#a64a3a]">
                  <span className="pt-1 font-mono text-[10px] text-[#ef745a]">{achievement.number}</span>
                  <div>
                    <h3 className="m-0 text-[16px] font-semibold tracking-[-0.02em] text-[#f5ece7] transition-colors group-hover:text-[#ef745a]">{achievement.title}</h3>
                    <p className="mt-1.5 mb-0 max-w-[400px] text-[12px] leading-[1.7] text-[#cbbab3]">{achievement.description}</p>
                  </div>
                </article>
              </ContentBlock>
            ))}
          </div>
        </div>

        <ContentBlock className="relative mx-auto aspect-[560/500] w-full max-w-[510px]">
          <AchievementScene3D />
          <div className="pointer-events-none absolute right-[7%] bottom-[7%] rounded-full border border-[#633b35]/80 bg-[#100b0a]/75 px-3 py-2 font-mono text-[8px] tracking-[0.12em] text-[#cbbab3] shadow-sm backdrop-blur-sm">
            RECOGNITION <span className="mx-1.5 text-[#8f6b62]">/</span> EFFORT IN MOTION
          </div>
        </ContentBlock>
      </div>
    </section>
  )
}
