import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Session() {
  const { idSession } = useParams();
  const [seat, setSeat] = useState({ seats: [] });

  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSession}/seats`
    );

    request.then((response) => {
      setSeat(response.data);
      console.log(response);
    });
  }, []);
  return (
    <div className="seats">
      {seat.seats.map(({ name, id, isAvailable }) => {
        return (
          <button className="number" key={id}>
            {name}
          </button>
        );
        /*   {
          isAvailable === true ? 
        } */
      })}
    </div>
  );
}
