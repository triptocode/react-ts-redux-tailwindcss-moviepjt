import { useState, useEffect, memo, useRef } from 'react'
import Slider from 'react-slick'
import { IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import movieTrailer from 'movie-trailer'

import 'react-lazy-load-image-component/src/effects/blur.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Row.css'

import axios from '../utils/api/axios'
import { MovieType } from '../types'
import { BASE_URL } from '../constants'
import YouTube from 'react-youtube'

type RowType = {
  title: string
  fetchUrl: string
  isLargeRow?: boolean
}

const RowCarousel = ({ title, fetchUrl, isLargeRow = false }: RowType) => {
  const [movies, setMovies] = useState<MovieType[]>([])
  const [trailerUrl, setTrailerUrl] = useState('')
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const sliderRef = useRef<Slider>(null)
  const base_url = BASE_URL

	// axios 로 영화 데이터 가져오기
	async function fetchMoviesData() {
		try {
			const request = await axios.get(fetchUrl)
			setMovies(request.data.results)
			return request
		} catch (error) {
			console.log(error)
		}
	}

	// call fetchMoviesData()
	useEffect(() => {
		fetchMoviesData()
	}, [fetchUrl])


  // YouTube 옵션
  const opts = {
    height: '450',
    width: '95%',
    playerVars: { autoplay: 1 },
  }

  const handleClick = (movie: MovieType) => {
    if (trailerUrl && selectedMovie?.id === movie.id) {
      setTrailerUrl('')
      setSelectedMovie(null)
    } else {
      setSelectedMovie(movie)
      movieTrailer(movie.name || movie.title || 'Movie')
        .then((fullUrl: any) => {
          if (fullUrl) {
            const urlParams = new URL(fullUrl).search
            const movieIdOnYoutube = new URLSearchParams(urlParams).get('v')
            if (movieIdOnYoutube) setTrailerUrl(movieIdOnYoutube)
          }
        })
        .catch(() => {
          setTrailerUrl('')
        })
    }
  }

  const handleCloseTrailer = () => {
    setTrailerUrl('')
    setSelectedMovie(null)
  }

  // 슬라이드 변경 시 화살표 표시 여부 업데이트
  const handleAfterChange = (current: number) => {
    const slider = sliderRef.current
    if (slider) {
      // @ts-ignore
      const slideCount = slider.props.children.length        // 전체 영화 개수
      // @ts-ignore
      const slidesToShow = slider.props.slidesToShow || 5   // 한 화면에 보이는 영화 개수
      
      setShowLeftArrow(current > 0)  // 현재 위치가 0보다 크면 왼쪽 화살표 표시
      setShowRightArrow(current < slideCount - slidesToShow) // 마지막 페이지가 아니면 오른쪽 화살표 표시
    }
  }

  // react-slick 설정
  const settings = {
    infinite: false,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false, // 기본 화살표 숨김
    afterChange: handleAfterChange,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
    ],
  }

  const handlePrev = () => {
    sliderRef.current?.slickPrev()
  }

  const handleNext = () => {
    sliderRef.current?.slickNext()
  }

  return (
    <div className="row">
        {/* 캐러셀 장르 4개의 각 제목 */}
      <h2 className="mb-3">{title}</h2>
      <div className="row__carousel relative">
        {/* 왼쪽 화살표 - 첫 페이지가 아닐 때만 표시 */}
        {showLeftArrow && (
          <IconButton
            onClick={handlePrev}
            sx={{
              color: 'white',
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        <Slider ref={sliderRef} {...settings}>
          {movies.map((movie) =>
            ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) ? (
              <div key={movie.id} className="px-1">
                <LazyLoadImage
                  effect="blur"
                  placeholderSrc="https://image.tmdb.org/t/p/original/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg"
                  src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.name || movie.title}
                  className="w-full object-cover rounded-md cursor-pointer transition-transform duration-300 hover:scale-105"
                  style={{
                    height: isLargeRow ? '300px' : '170px',
                  }}
                  onClick={() => handleClick(movie)}
                />
              </div>
            ) : null
          )}
        </Slider>

        {/* 오른쪽 화살표 - 마지막 페이지가 아닐 때만 표시 */}
        {showRightArrow && (
          <IconButton
            onClick={handleNext}
            sx={{
              color: 'white',
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </div>

      {trailerUrl && selectedMovie && (
        <div className="mt-6">
          <div onClick={handleCloseTrailer} className="cursor-pointer">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
          
          {/* 영화 정보 섹션 */}
          <div className="mt-4 p-6 bg-gray-900 rounded-lg">
            <div className="flex items-start gap-6">
              {/* 포스터 이미지 */}
              <div className="flex-shrink-0">
                <img
                  src={`${BASE_URL}${selectedMovie.poster_path || selectedMovie.backdrop_path}`}
                  alt={selectedMovie.name || selectedMovie.title}
                  className="w-32 h-48 object-cover rounded-md"
                />
              </div>

              {/* 영화 정보 */}
              <div className="flex-1 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedMovie.title || selectedMovie.name}
                </h3>
                
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-300">
                  {selectedMovie.release_date && (
                    <span>Release Date: {selectedMovie.release_date}</span>
                  )}
                  {selectedMovie.vote_average && (
                    <span className="flex items-center gap-1">
                      ⭐ {selectedMovie.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {selectedMovie.overview || 'No description available.'}
                </p>

                {selectedMovie.original_language && (
                  <div className="mt-3 text-sm text-gray-400">
                    Original Language: {selectedMovie.original_language.toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* 닫기 버튼 - 우측 정렬 */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseTrailer}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(RowCarousel)