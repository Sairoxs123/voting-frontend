import schoolBg from "../assets/school.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <header
      className="relative flex h-screen flex-col items-center justify-center bg-cover bg-center p-5 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${schoolBg})`,
      }}
    >
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold text-white drop-shadow-lg md:text-6xl lg:text-7xl">
          VOTE!
        </h1>
        <h6 className="mb-6 text-lg italic opacity-90 md:text-xl lg:text-2xl">
          "A leader's courage to fulfill his vision comes from passion, not
          position."
        </h6>
        <h5 className="mb-10 text-xl-uppercase tracking-wide md:text-2xl lg:text-3xl">
          Choose Your Leaders Now!
        </h5>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        <Link
          to="/auth"
          className="rounded-md border-2 border-white bg-black bg-opacity-30 px-8 py-3 text-lg text-white transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:bg-white hover:text-black hover:shadow-lg md:px-10 md:py-4 md:text-xl"
        >
          Start Voting
        </Link>
        <Link
          to="/admin"
          className="rounded-md border-2 border-white bg-black bg-opacity-30 px-8 py-3 text-lg text-white transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:bg-white hover:text-black hover:shadow-lg md:px-10 md:py-4 md:text-xl"
        >
          Admin Login
        </Link>
      </div>
    </header>
  );
};

export default Home;
