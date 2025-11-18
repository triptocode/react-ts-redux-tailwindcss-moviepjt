// TMDB API KEY ( 하단 carousel 영상 관련 API KEY)
const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY

// 하단 carousel 영상을 가져올 TMDB API req URL 설정 
const request = {
	
	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	// fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=ko-KR`,
	// fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&rgion=KR`, 
	// fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=ko-KR&rgion=KR`, 

	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchAnimationMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
	fetchScienceFictionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
}

export default request
