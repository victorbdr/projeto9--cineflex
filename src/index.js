import ReactDOM from "react-dom";
import Movies from "./Routes/Movies";
import Sucess from "./Routes/Sucess";
import Session from "./Routes/Session";
import Time from "./Routes/Time";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />}></Route>
        <Route path="/movie/:idMovie" element={<Time />}></Route>
        <Route path="/session/:idSessao" element={<Session />}></Route>
        <Route path="/sucess" element={<Sucess />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
