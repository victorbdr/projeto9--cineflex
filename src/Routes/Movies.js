import React from "react";
import { Link, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

function Image({ url, posterURL }) {
  return (
    <div className="image">
      <img src={url} alt="movie" />
      <div className="details">
        <div className="text">{posterURL}</div>
      </div>
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
    <div className="movies">
      <div className="container">
        <div className="images">
          {items.map((item) => (
            <Link to="/movie">
              <Image key={item.id} url={item.posterURL} name={item.title} />{" "}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
