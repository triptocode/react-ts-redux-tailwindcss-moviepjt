
import { Link } from "react-router";

export default function NotFoundScreen() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black text-white">
      {/* 🔹 배경 비디오 효과 */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source
          src="https://cdn.pixabay.com/vimeo/343759888/movie-clip-22853.mp4?width=640&hash=08bfa8e2490c03a9b38a47f19bb5e3b557fe8f36"
          type="video/mp4"
        />
      </video>

      {/* 🔹 반투명 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      {/* 🔹 메인 콘텐츠 */}
      <div className="relative z-10 text-center px-6 py-12">
        <h1 className="text-[6rem] md:text-[8rem] font-extrabold tracking-widest text-red-600 drop-shadow-lg">
          404
        </h1>

        <p className="mt-4 text-2xl font-semibold text-gray-100">
          Lost your way?
        </p>
        <p className="mt-2 text-lg text-gray-300 max-w-md mx-auto">
          Sorry, we can’t find that page. You’ll find plenty to explore on the
          home page.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block px-8 py-3 bg-red-600 rounded-lg font-bold text-lg transition-all hover:bg-red-700 hover:scale-105 shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
