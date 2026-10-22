import { strings } from '../utils/strings.js'

export function Footer() {
  return (
    <footer className="mx-auto grid min-h-[90px] w-full max-w-[1224px] grid-cols-[auto_1fr_auto] items-center gap-2.5 px-5 text-[9px] text-[#bda8a1] md:grid-cols-[auto_1fr_auto_auto] md:gap-[26px] md:px-8 md:text-[10px]">
      <a className="text-[15px] font-semibold text-[#f5ece7] no-underline" href="#home">
        Umanshi
      </a>
      <p className="m-0 max-w-[170px] leading-relaxed md:max-w-none">{strings.footer.statement}</p>
      <a className="text-[#cbbab3] no-underline transition hover:text-[#ef745a]" href="#home">{strings.footer.backToTop} ↑</a>
      <span className="col-[2/4] row-[2] justify-self-end md:col-auto md:row-auto">{strings.footer.copyright}</span>
    </footer>
  )
}
