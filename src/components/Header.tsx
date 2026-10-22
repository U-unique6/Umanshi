import { useState } from 'react'
import { strings } from '../utils/strings.js'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-20 border-b border-[#63352f]/45 bg-[#100b0a]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] w-full max-w-[1224px] items-center justify-between px-5 md:px-8">
        <a
          className="text-[19px] font-semibold tracking-[-0.045em] text-[#f2e8e3]"
          href="#home"
          aria-label="Umanshi — home"
          onClick={closeMenu}
        >
          Umanshi
        </a>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] rounded-[5px] border border-[#63352f] text-[#f2e8e3] md:hidden"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? strings.navigation.close : strings.navigation.open}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`h-px w-[17px] bg-current transition-transform ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-[17px] bg-current transition-transform ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>

        <nav
          className={`${menuOpen ? 'flex' : 'hidden'} absolute top-[77px] right-0 left-0 flex-col border-b border-[#63352f]/60 bg-[#100b0a] px-5 pb-5 md:static md:flex md:flex-row md:items-center md:gap-[30px] md:border-0 md:bg-transparent md:p-0`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <a className="border-b border-[#63352f]/40 py-4 text-[13px] text-[#cbbab3] hover:text-[#ef745a] md:border-0 md:py-0 md:text-xs" href="#about" onClick={closeMenu}>{strings.navigation.about}</a>
          <a className="border-b border-[#63352f]/40 py-4 text-[13px] text-[#cbbab3] hover:text-[#ef745a] md:border-0 md:py-0 md:text-xs" href="#approach" onClick={closeMenu}>{strings.navigation.approach}</a>
          <a className="border-b border-[#63352f]/40 py-4 text-[13px] text-[#cbbab3] hover:text-[#ef745a] md:border-0 md:py-0 md:text-xs" href="#experience" onClick={closeMenu}>{strings.navigation.experience}</a>
          <a className="border-b border-[#63352f]/40 py-4 text-[13px] text-[#cbbab3] hover:text-[#ef745a] md:border-0 md:py-0 md:text-xs" href="#skills" onClick={closeMenu}>{strings.navigation.skills}</a>
          <a className="border-b border-[#63352f]/40 py-4 text-[13px] text-[#cbbab3] hover:text-[#ef745a] md:border-0 md:py-0 md:text-xs" href="#education" onClick={closeMenu}>{strings.navigation.education}</a>
          <a className="border-b border-[#63352f]/40 py-4 text-[13px] text-[#cbbab3] hover:text-[#ef745a] md:border-0 md:py-0 md:text-xs" href="#achievements" onClick={closeMenu}>{strings.navigation.achievements}</a>
          <a className="mt-3 rounded-[5px] border border-[#63352f] px-3.5 py-3 text-center text-[13px] text-[#f2e8e3] hover:border-[#ef745a] md:mt-0 md:py-2.5 md:text-xs" href="#contact" onClick={closeMenu}>
            {strings.navigation.contact} <span className="ml-2 text-[#ef745a]">↗</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
