export const SUPPORTED_LANGUAGES = [
	{
		identifier: 'en',
		name: 'English',
	},
	{
		identifier: 'es',
		name: 'Spanish',
	},
	{
		identifier: 'ja',
		name: 'Japanese',
	},
	{
		identifier: 'ko',
		name: 'Korean',
	},
]

export const API_OPTIONS = {
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${
			import.meta.env.VITE_REACT_APP_TMDB_API_ACCESS_TOKEN
		}`,
	},
}

export const SEARCH_QUERY = 'https://api.themoviedb.org/3/search/movie?query='

export const BASE_URL = 'https://image.tmdb.org/t/p/original'

export const FALLBACK_IMAGE_URL = `https://image.tmdb.org/t/p/original/4vCh8R4yd6ybOmbxRAPOzaXmLTV.jpg`
