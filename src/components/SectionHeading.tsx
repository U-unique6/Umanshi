type SectionHeadingProps = {
  number: string
  label: string
  title: string
  emphasis: string
  className?: string
}

export function SectionHeading({
  number,
  label,
  title,
  emphasis,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#bda8a1]">
        <span className="text-[#ef745a]">{number}</span> / {label}
      </p>
      <h2 className="mt-4 max-w-[780px] text-4xl leading-[1.14] font-semibold tracking-[-0.055em] text-[#f5ece7] md:text-[54px]">
        {title} <span className="text-[#ef745a]">{emphasis}</span>
      </h2>
    </div>
  )
}
