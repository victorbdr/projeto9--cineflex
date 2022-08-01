import React from "react";
import "./css/movies.css";
import { Link, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

function Image({ url, posterURL }) {
  return (
    <div className="image">
      <img className="poster" src={url} alt="movie" />
      <div className="text">{posterURL}</div>
    </div>
  );
}

export default function Movies() {
  const params = useParams();
  console.log(params);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v7/cineflex/movies/"
    );

    promise.then((response) => {
      console.log(promise);
      setItems(response.data);
    });
  });

  return (
    <>
      <header>
        <h2>Selecione o filme</h2>
      </header>
      <div className="movies">
        <div className="container">
          <div className="images">
            {items.map((item) => (
              <Link to={`/movie/${item.id}`} key={item.id}>
                <Image key={item.id} url={item.posterURL} name={item.title} />{" "}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
