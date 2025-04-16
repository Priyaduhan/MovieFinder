import React from "react";
import NoPoster from "../assets/no-movie.png";
import star from "../assets/star.svg";

const Cards = ({
  movie: { title, poster_path, vote_average, original_language, release_date },
}) => {
  return (
    <div
      className="text-white w-60 mx-auto mt-3 flex flex-col bg-blue-950 shadow-blue-800 rounded-2xl
    sm:w-65 md:w-70 lg:w-90
    "
    >
      <div className="w-[210px] mx-auto sm:w-[200px] md:w-[230px] lg:w-[280px]">
        <img
          className="h-[290px] w-[210px] rounded-[8px] mx-auto mt-3"
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt=""
        />
        <div className="">
          <h3 className="text-white">{title}</h3>
          <div className="flex flex-row gap-2 mb-1">
            <div className="flex gap-1">
              <img src={star} alt="star" />
              <p>{vote_average ? vote_average.toFixed(1) : "N / A"}</p>
            </div>
            <span>•</span>
            <p>{original_language}</p>
            <span>•</span>
            <p>{release_date ? release_date.split("-")[0] : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
