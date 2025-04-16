import { useState, useEffect } from "react";
// import { useDebounce } from "react-use";

import axios from "axios";
import "./App.css";
import Hero from "./components/hero";
import Cards from "./components/Cards";
import heroBg from "../src/assets/hero-bg.png";
import Spinner from "./components/Spinner";

import Search from "./components/Search";

// const API_BASE_URL = "https://api.themoviedb.org/3";
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [searchTerm, setsearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  // useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  const getMovieData = (query = "") => {
    setIsLoading(true);

    axios
      .get(
        query
          ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              query
            )}&api_key=d68e08fbd2b798d2d15aca9b2f3f0ad4`
          : "https://api.themoviedb.org/3/discover/movie?include_adult=false&&language=en-US&page=1&sort_by=popularity.desc&api_key=d68e08fbd2b798d2d15aca9b2f3f0ad4"
      )
      .then((response) => {
        console.log(response.data.results);
        setMovieList(response.data.results);
      })
      .catch((error) => {
        setErrorMessage("Error fetching movies. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getMovieData(debounceSearchTerm);
  }, [debounceSearchTerm]);

  return (
    <>
      <div style={{ backgroundImage: `url(${heroBg})` }}>
        <Hero searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        <section>
          <p className="text-white">All Movies</p>
          {isLoading ? (
            <Spinner></Spinner>
          ) : errorMessage ? (
            <p className="text-white">{errorMessage}</p>
          ) : (
            <div className="grid grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-4 ">
              {movieList.map((movie) => (
                <Cards key={movie.id} movie={movie}></Cards>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
