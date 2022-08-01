import "./css/session.css";
import React from "react";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Session() {
  const [movie, setMovie] = useState();
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate("");
  const [selecionados, setSelecionados] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState([]);
  console.log(selectedInfo);
  const { idSession } = useParams();
  const [seat, setSeat] = useState({ seats: [] });
  console.log(seat);

  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSession}/seats`
    );

    request.then((response) => {
      setSeat(response.data);
      console.log(response);
    });
  }, []);
  function handleSelection(id) {
    const auxSelecteds = [...selecionados];
    const auxInfoSelected = [...selectedInfo];
    const selectedIndex = auxSelecteds.findIndex(
      (selecionado) => selecionado === id
    );
    if (selectedIndex === -1) {
      auxSelecteds.push(id);
      auxInfoSelected.push(seat.seats.find((item) => item.id === id));
    } else {
      auxSelecteds.splice(selectedIndex, 1);
      auxInfoSelected.splice(selectedIndex, 1);
    }
    setSelectedInfo(auxInfoSelected);
    setSelecionados(auxSelecteds);
  }

  function handleForm(event) {
    event.preventDefault();
    const whoIs = { ids: selecionados, name: name, cpf };

    const request = axios.post(
      "https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many",
      whoIs
    );
    console.log(name + cpf);
    request.then(() => {
      navigate("/sucess", {
        state: {
          movie: {
            name: seat.movie.title,
            hour: seat.name,
            date: seat.day.date,
          },
          userInfo: { username: name, cpf },
          selectedSeats: selectedInfo,
        },
      });
    });
    request.catch((error) => console.log(error.response));
  }

  return (
    <>
      <div className="top">
        <h2>Selecione o(s) assento(s)</h2>
      </div>
      <div className="seats">
        {seat.seats.map(({ name, id, isAvailable }) => {
          return !isAvailable ? (
            <button className={"indisponivel"} key={id}>
              {name}
            </button>
          ) : (
            <button
              onClick={() => handleSelection(id)}
              className={
                selecionados.some((selecionado) => selecionado === id)
                  ? "selecionado"
                  : "disponivel"
              }
              key={id}
            >
              {name}
            </button>
          );
        })}
      </div>
      <div className="caption">
        <button className="selecionado"></button>
        <h3>Selecionado</h3>
        <button className="disponivel"></button>
        <h3>Disponivel</h3>
        <button className="indisponivel"></button>
        <h3>Indisponivel</h3>
      </div>
      <form className="indentifier" onSubmit={handleForm}>
        <p>Nome do comprador:</p>
        <input
          type="text"
          required
          onChange={(event) => setName(event.target.value)}
        />
        <p>CPF do comprador:</p>
        <input
          pattern="([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"
          value={cpf}
          type="number"
          required
          onChange={(event) => setCpf(event.target.value)}
        />
        <div className="confirmButton">
          <button className="confirmation" onClick={handleForm}>
            Reservar assento(s)
          </button>
        </div>
      </form>
      <Footer
      /* url={seat.movie.posterURL}
        title={seat.movie.title}
        weekday={seat.day.weekday}
        date={seat.name} */
      />
      <div className="confirmButton">
        {/*  <button className="confirmSelected" onClick={() => navigate({
          movie: {
            nome
          },
          tickets: selecionados,
          buyer: {
            name: inputdomem
            cpf: inptudopcps
          }
        })}>Reservar assento(s)</button> */}
      </div>
    </>
  );
}
