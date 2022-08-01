import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

/* function Hour(props) {
  return (
    <div className="session">
      {props.id}
      <div className="days">
        {props.weekday} - {props.date}
        <div className="time">
          <div className="text">{props.showtimes}</div>
        </div>
      </div>
    </div>
  );
} */

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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
