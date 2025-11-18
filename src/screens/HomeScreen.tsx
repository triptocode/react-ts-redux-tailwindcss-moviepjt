import { Suspense, useState } from 'react'

// import Row from '../components/Row'
import RowCarousel from '../components/RowCarousel'
import NAV from '../components/NAV'
import Banner from '../components/Banner'
import request from '../utils/api/requests'

export default function HomeScreen() {


	return (
		<div className="homeScreen">
			<Suspense fallback={<div>Loading...</div>}>
				<NAV
					isShowLanguage={true}
				/>
			</Suspense>
			<>
					<div>
						<Banner />
						<div className="mt-10"> 
							<RowCarousel title="Top 10 Movies" fetchUrl={request.fetchTopRated}/>
							<RowCarousel title="Action Movies" fetchUrl={request.fetchActionMovies} />
							<RowCarousel title="Animation Movies" fetchUrl={request.fetchAnimationMovies} />
							<RowCarousel title="Science Fiction Movies" fetchUrl={request.fetchScienceFictionMovies} />
						</div>
					</div>
				{/* )} */}
			</>
		</div>
	)
}
