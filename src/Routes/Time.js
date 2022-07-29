import React from "react";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

function Hour({ idMovie, time }) {
  return (
    <div className="date">
      <h3>{idMovie}</h3>
      <div className="details">
        <div className="text">{time}</div>
      </div>
    </div>
  );
}

export default function Time() {
  const { idMovie } = useParams();
  console.log(idMovie);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v7/cineflex/movies/{idMovie}/showtimes"
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
            <Hour key={item.id} url={item.time} name={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
