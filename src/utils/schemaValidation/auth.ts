import * as Yup from 'yup'

export const AuthSchemaValidation = Yup.object().shape({
	email: Yup.string().required('Email is required').email('Email is invalid'),
	password: Yup.string()
		.required('패스워드를 작성해 주세요')
		.min(6, '패스워드는 최소 6 자리여야 합니다'),
})
