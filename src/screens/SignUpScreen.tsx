/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router'

import { AuthRequestType } from '../types'
import { AuthSchemaValidation } from '../utils'
import {
	auth,
	createUserWithEmailAndPassword,
	// GoogleAuthProvider,
	googleProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from '../config'
import googleLogo from '../assets/images/google.png'

export default function SignUpScreen() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthRequestType>({
		resolver: yupResolver(AuthSchemaValidation),
	})

	const history = useNavigate()

	//  입력받은 이메일과 비밀번호로 Firebase에서 신규 사용자 생성 --> 성공시 / 홈으로 이동
	const registerUserWithEmailAndPasswordHandler = (data: AuthRequestType) => {
		console.log(JSON.stringify(data, null, 2))

		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then(() => {
				// Signed in        로그인 --> 성공시 영화 장르별 캐러셀 화면으로 이동
				history('/browser')      
			})
			.catch((error) => {
				const errorMessage = error?.message
				alert(errorMessage)
			})
	}

	// 이메일/비밀번호 로그인 처리
	const signInWithEmailAndPasswordHandler = (data: AuthRequestType) => {
		console.log(JSON.stringify(data, null, 2))

		signInWithEmailAndPassword(auth, data.email, data.password)
			.then((_userCredential) => {
				// signIn successful.           로그인 --> 성공시 영화 장르별 캐러셀 화면으로 이동
				// console.log(user)
				history('/browser')
			})
			.catch((error) => {
				const errorMessage = error.message
				alert(errorMessage)
			})
	}
    // 구글 로그인 처리
	const signInWithGoogleHandler = () => {
		signInWithPopup(auth, googleProvider)
			.then((_result) => {
				history('/browser')                  //   로그인 --> 성공시 영화 장르별 캐러셀 화면으로 이동
				// console.log(result, user)
			})
			.catch((error) => {
				// Handle Errors here.
				const errorMessage = error?.message
				// The email of the user's account used.
				// The AuthCredential type that was used.
				alert(errorMessage)
			})
	}

	return (
		<div className="absolute top-8 left-0 right-0 w-full h-[100vh]  max-h-[100vh] flex justify-center ">
			<div
				className="bg-transparent bg-opacity-75 p-9 rounded w-[400px] max-w-[350px] h-fit"
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.75)',
				}}>
				<form className="flex flex-col items-center w-full">
					<h1 className="text-2xl text-left mb-8 font-bold mt-0">로그인</h1>
					{errors.email && (
						<p className="w-full text-left text-xs text-red-500 mb-2">
							{errors.email.message}
						</p>
					)}
					<input
						id="email"
						placeholder="이메일 주소"
						{...register('email')}
						className={` min-h-[50px] border-0 w-full max-w-full mb-[19px] mt-[3px] p-[16px_20px] box-border text-white bg-[#333]  duration-400 rounded-[5px] outline-none transition duration-300 ${
							errors.email ? 'border border-red-500' : ''
						}`}
						aria-invalid={errors.email ? 'true' : 'false'}
						aria-describedby="email-error"
					/>
					{errors.password && (
						<p className="w-full text-left text-xs text-red-500 mb-2">
							{errors.password.message}
						</p>
					)}
					<input
						type="password"
						placeholder="비밀번호"
						id="password"
						className={`w-full mb-5 p-4 text-white bg-[#333] border border-transparent rounded-md focus:outline-none  transition duration-300 ${
							errors.password ? 'border-red-500' : ''
						}`}
						{...register('password')}
						aria-invalid={errors.password ? 'true' : 'false'}
						aria-describedby="password-error"
					/>
					<button
						onClick={handleSubmit(signInWithEmailAndPasswordHandler)}
						type="submit"
						name="submit"
						className="w-full p-4 text-white bg-[#e50914] font-semibold rounded-md hover:bg-[#b20710] transition duration-300">
						로그인
					</button>
					<h4 className="w-full text-center text-lg font-semibold mt-4">
						<span className="text-[#737373]">New to MovieSpace? </span>
						<span
							onClick={handleSubmit(registerUserWithEmailAndPasswordHandler)}
							className="cursor-pointer underline text-white">
							Sign up now
						</span>
					</h4>
				</form>
				<div className="flex items-center text-[#737373] text-[16px] font-medium cursor-pointer justify-center mt-4">
					<img
						onClick={signInWithGoogleHandler}
						src={googleLogo}
						alt="Google Logo"
						className="w-8 h-8 mr-3"
					/>
					<h5
						onClick={signInWithGoogleHandler}
						className="underline text-lg font-semibold text-[#737373] ">
						Login With Google
					</h5>
				</div>
			</div>
		</div>
	)
}
