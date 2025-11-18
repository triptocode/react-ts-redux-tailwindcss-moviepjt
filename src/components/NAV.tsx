import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import logo from '../assets/images/movie_logo.png'
import profile from '../assets/images/profile__logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { setLanguage } from '../features/appConfig/languageSlice'
import { SUPPORTED_LANGUAGES } from '../constants'

interface NAVProps {

	isShowLanguage?: boolean
}

const NAV = ({
	isShowLanguage = false,
}: NAVProps) => {
	const dispatch = useDispatch()
	const { selectedLanguage } = useSelector((state: RootState) => state.language)

	const history = useNavigate()
	const [show, handleShowNav] = useState(false)

	const transitionNavBar = () => {
		if (window.scrollY > 100) {
			handleShowNav(true)
		} else {
			handleShowNav(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', transitionNavBar)

		// cleanup after done clean up
		return () => window.removeEventListener('scroll', transitionNavBar)
	}, [])

	// 언어변경 함수
	const changeLanguage = (language: string) => {
		dispatch(setLanguage(language))
	}

	return (
		<div
			className={`nav fixed top-0 p-5 w-full h-[30px] z-10 transition-all duration-500 ${
				show ? 'bg-gray-900 h-[40px]' : ''
			}`}>
			<div className="nav__contents flex justify-between cursor-pointer">
				<img
					onClick={() => history('/')}
					className="fixed top-3 left-0 w-[95px] pl-5 cursor-pointer"
					src={logo}
					alt="logo"
				/>
				<div className="fixed top-3 right-5 flex items-center space-x-6 cursor-pointer">
					{/* 언어 변경 select 박스 */}
					{isShowLanguage && (
						<div className="language-select  ">
							<select
								value={selectedLanguage}
								onChange={(e) => changeLanguage(e.target.value)}
								className="bg-red-800 text-white py-3 px-4 rounded-md text-sm outline-none font-bold">
								{SUPPORTED_LANGUAGES.map((lang) => (
									<option key={lang.identifier} value={lang.identifier}>
										{lang.name}
									</option>
								))}
							</select>
						</div>
					)}

					{/* 개인 프로필 사진 - 클릭시 상세페이지*/}
					<div>
						<img
							onClick={() => history('/profile')}
							className="w-[35px] cursor-pointer"
							src={profile}
							alt="profile"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NAV
