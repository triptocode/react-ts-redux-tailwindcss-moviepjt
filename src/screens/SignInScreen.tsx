import SignUpScreen from './SignUpScreen'
import logo from '../assets/images/movie_logo.png'
import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function SignInScreen() {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [signIn, setSignIn] = useState(false)
  const [email, setEmail] = useState('')

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const currentLabel = i18n.language === 'ko' ? '한국어' : 'English'

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!email) {
      alert('Please enter a valid email address.')
    }
  }

  return (
    <div className="fixed top-0 h-full w-[100vw] overflow-x-hidden bg-[url('../assets/images/backgroundImage.jpg')] bg-center bg-cover bg-no-repeat">
      {/* 상단 네비 영역 */}
      <div className="flex items-center justify-between px-6 py-5 relative bg-black/85">
        {/* 로고 */}
        <img
          className="w-[180px] object-contain max-h-[200px]"
          src={logo}
          alt="MovieSpace"
        />

        {/* 언어 + 로그인 버튼 */}
        <div className="flex items-center space-x-4">
          {/* 언어 선택 드롭다운 */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="rounded-md bg-black/80 text-white px-3 py-2 flex items-center gap-1 hover:bg-black/60"
            >
              {currentLabel}
              <svg width="12" height="6" fill="currentColor">
                <path d="M0 0l6 6 6-6z" />
              </svg>
            </button>

            {/* 드롭다운 메뉴 (absolute 위치로 레이아웃에 영향 X) */}
            {open && (
              <ul className="absolute left-0 mt-2 w-28 bg-black text-white rounded-md shadow-lg border border-white/20 z-50">
                <li>
                  <button
                    onClick={() => {
                      i18n.changeLanguage('en')
                      setOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-700"
                  >
                    English
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      i18n.changeLanguage('ko')
                      setOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-700"
                  >
                    한국어
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* 로그인 버튼 */}
          <button
            onClick={() => setSignIn(true)}
            className="py-2 px-5 text-white bg-[#e50914] rounded-lg font-semibold text-base hover:bg-[#b20710] transition-transform transform hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* 배경 블러 + 중앙 콘텐츠 */}
      <div className="w-full h-screen bg-black/40 bg-gradient-to-t from-black/80 via-transparent to-black/80"></div>
      <div className="absolute top-[15%] w-full p-5 flex justify-center z-10">
        <div className="text-center text-white w-full max-w-[640px] p-[75px]">
          {signIn ? (
            <SignUpScreen />
          ) : (
            <>
              <h1 className="text-[1.8rem] md:text-[3.125rem] mb-5">{t('intro1')}</h1>
              <h2 className="text-lg md:text-[1.625rem] mb-5">{t('intro2')}</h2>
              <h3 className="text-lg mb-5">{t('intro3')}</h3>

              <form onSubmit={handleSubmit} className="px-4">
                <input
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[90%] md:w-[55%] block md:inline-block mb-5 md:mb-0 text-base rounded-sm min-h-[40px] p-[16px_20px] text-black outline-none border-b-[1px] border-transparent hover:border-[#e50914] transition duration-300"
                />
                <button
                  type="submit"
                  className="w-[90%] md:w-auto block md:inline-block min-h-[40px] p-[16px_20px] text-base rounded-sm text-white bg-[#e50914] hover:bg-[#b20710] transition-colors duration-300 font-semibold cursor-pointer"
                >
                  {t('getStarted')}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
