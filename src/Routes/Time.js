import React from "react";
import "./css/time.css";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Time() {
  const { idMovie } = useParams();
  console.log(idMovie);
  const [session, setSession] = useState({ days: [] });
  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`
    );

    request.then((response) => {
      setSession(response.data);
      console.log(response);
    });
  }, []);

  return (
    <>
      <div className="top">
        <h2>Selecione o horário</h2>
      </div>
      <div className="movies">
        {session.days.map(({ id, weekday, date, showtimes }) => (
          <div className="Movies" key={id}>
            <div className="session">
              <div className="days">
                {weekday} - {date}
                <div className="time">
                  {showtimes.map(({ id, name }) => (
                    <Link to={`/session/${id}`} key={id}>
                      <button className="movietime">{name}</button>
                    </Link>
                  ))}
                  <Footer url={session.posterURL} title={session.title} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
