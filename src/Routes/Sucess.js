import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./css/sucess.css";
export default function Sucess() {
  const location = useLocation();
  console.log(location);
  const {
    movie: { date, hour, name },
    userInfo: { username, cpf },
    selectedSeats,
  } = location.state;
  console.log(selectedSeats);
  return (
    <div className="endInfo">
      <h5> Pedido feito com sucesso!</h5>
      <div className="movieInfo">
        <h4>Filme e sessão</h4>
        <p>{name}</p>
        <p>
          {date} - {hour}
        </p>
      </div>
      <div className="yourInfo">
        <h4>Comprador</h4>
        <p> {username}</p>
        <p>{cpf}</p>
      </div>
      <div className="tickets">
        <h4>Ingressos</h4>
        {selectedSeats.map((seat) => (
          <p key={seat.id}>Assento{seat.name}</p>
        ))}
      </div>
      <Link to="/" className="backToHome">
        <button className="backButton">Voltar para a Home</button>
      </Link>
    </div>
  );
}
